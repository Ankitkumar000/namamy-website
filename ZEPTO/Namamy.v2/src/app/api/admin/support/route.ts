import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

function verifyAdmin(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    throw new Error('Authorization token required');
  }

  const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
  
  if (decoded.role !== 'ADMIN') {
    throw new Error('Admin access required');
  }

  return decoded;
}

// Get support tickets (contact inquiries)
export async function GET(request: NextRequest) {
  try {
    verifyAdmin(request);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const search = searchParams.get('search');

    let where: any = {};

    if (status) {
      where.status = status;
    }

    if (priority) {
      where.priority = priority;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [tickets, totalCount] = await Promise.all([
      prisma.contact.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [
          { priority: 'desc' },
          { createdAt: 'desc' }
        ]
      }),
      prisma.contact.count({ where })
    ]);

    return NextResponse.json({
      tickets,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
        itemsPerPage: limit
      }
    });

  } catch (error) {
    console.error('Support tickets fetch error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch support tickets' },
      { status: error instanceof Error && error.message.includes('Admin') ? 403 : 500 }
    );
  }
}

// Create support ticket response
export async function POST(request: NextRequest) {
  try {
    verifyAdmin(request);

    const { contactId, response, status, priority, internalNotes } = await request.json();

    // Get the original contact
    const contact = await prisma.contact.findUnique({
      where: { id: contactId }
    });

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact inquiry not found' },
        { status: 404 }
      );
    }

    // Update contact with response
    const updatedContact = await prisma.contact.update({
      where: { id: contactId },
      data: {
        ...(response && { 
          message: contact.message + '\n\n--- ADMIN RESPONSE ---\n' + response 
        }),
        ...(status && { status }),
        ...(priority && { priority }),
        ...(internalNotes && { 
          subject: contact.subject + (internalNotes ? ` [Notes: ${internalNotes}]` : '')
        }),
        updatedAt: new Date()
      }
    });

    // Send response email to customer
    if (response) {
      await sendEmail({
        to: contact.email,
        subject: `Re: ${contact.subject}`,
        html: `
          <h2>Response to your inquiry</h2>
          <p>Dear ${contact.name},</p>
          <p>Thank you for contacting Namamy. Here's our response to your inquiry:</p>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <strong>Your original message:</strong><br>
            ${contact.message.replace(/\n/g, '<br>')}
          </div>
          
          <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <strong>Our response:</strong><br>
            ${response.replace(/\n/g, '<br>')}
          </div>
          
          <p>If you have any further questions, please don't hesitate to contact us.</p>
          <p>Best regards,<br>Namamy Customer Support Team</p>
        `
      });
    }

    return NextResponse.json({
      ticket: updatedContact,
      message: 'Support ticket updated successfully'
    });

  } catch (error) {
    console.error('Support ticket update error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update support ticket' },
      { status: error instanceof Error && error.message.includes('Admin') ? 403 : 500 }
    );
  }
}