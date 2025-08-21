import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message, category } = await request.json();

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Name, email, subject, and message are required' },
        { status: 400 }
      );
    }

    // Create contact inquiry
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
        category: category || 'GENERAL',
        status: 'NEW',
        priority: 'MEDIUM',
        source: 'CONTACT_FORM'
      }
    });

    // Send confirmation email to user
    try {
      await sendEmail({
        to: email,
        subject: 'We received your message - Namamy',
        html: `
          <h2>Thank you for contacting us!</h2>
          <p>Dear ${name},</p>
          <p>We have received your message and will get back to you within 24 hours.</p>
          
          <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3>Your Message:</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
          
          <p>Reference ID: ${contact.id}</p>
          <p>Best regards,<br>The Namamy Team</p>
        `
      });

      // Send notification email to admin
      await sendEmail({
        to: process.env.ADMIN_EMAIL || 'contact@namamy.com',
        subject: `New Contact Form Submission - ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Category:</strong> ${category || 'GENERAL'}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; margin: 10px 0;">
            ${message}
          </div>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Reference ID:</strong> ${contact.id}</p>
        `
      });

    } catch (emailError) {
      console.error('Contact form email error:', emailError);
      // Don't fail the contact form if email fails
    }

    return NextResponse.json({
      contact,
      message: 'Your message has been sent successfully!'
    }, { status: 201 });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const priority = searchParams.get('priority');

    let where: any = {};
    if (status) where.status = status;
    if (category) where.category = category;
    if (priority) where.priority = priority;

    const contacts = await prisma.contact.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ contacts });

  } catch (error) {
    console.error('Contact fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}