import { NextRequest, NextResponse } from 'next/server';

// This would be imported from the main route file or database
// For now, we'll use the same mock data structure
let emailTemplates = [
  {
    id: '1',
    name: 'Order Confirmation',
    subject: 'Your Namamy Order #{orderNumber} is Confirmed!',
    description: 'Sent when customer places an order',
    category: 'order',
    status: 'active',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #059669;">Thank you for your order!</h1>
        <p>Hi {customerName},</p>
        <p>Your order #{orderNumber} has been confirmed and is being processed.</p>
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
          <h3>Order Details:</h3>
          <p>Order Total: ₹{orderTotal}</p>
          <p>Delivery Address: {deliveryAddress}</p>
        </div>
        <p>We'll send you another email when your order ships.</p>
        <p>Thanks for choosing Namamy!</p>
      </div>
    `,
    textContent: 'Hi {customerName}, Your order #{orderNumber} has been confirmed...',
    variables: ['customerName', 'orderNumber', 'orderTotal', 'deliveryAddress'],
    lastUsed: '2024-01-30T10:30:00Z',
    usageCount: 245,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  }
];

// GET - Get specific email template
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const template = emailTemplates.find(t => t.id === id);
    
    if (!template) {
      return NextResponse.json(
        { success: false, error: 'Email template not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      template
    });
  } catch (error) {
    console.error('Error fetching email template:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch email template' },
      { status: 500 }
    );
  }
}

// PUT - Update email template
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const templateIndex = emailTemplates.findIndex(t => t.id === id);
    
    if (templateIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Email template not found' },
        { status: 404 }
      );
    }

    // Update template
    const updatedTemplate = {
      ...emailTemplates[templateIndex],
      ...body,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };

    emailTemplates[templateIndex] = updatedTemplate;

    console.log(`Email template updated: ${updatedTemplate.name}`);

    return NextResponse.json({
      success: true,
      template: updatedTemplate,
      message: 'Email template updated successfully'
    });
  } catch (error) {
    console.error('Error updating email template:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update email template' },
      { status: 500 }
    );
  }
}

// DELETE - Delete email template
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const templateIndex = emailTemplates.findIndex(t => t.id === id);
    
    if (templateIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Email template not found' },
        { status: 404 }
      );
    }

    const deletedTemplate = emailTemplates[templateIndex];
    emailTemplates.splice(templateIndex, 1);

    console.log(`Email template deleted: ${deletedTemplate.name}`);

    return NextResponse.json({
      success: true,
      message: 'Email template deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting email template:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete email template' },
      { status: 500 }
    );
  }
}

// PATCH - Perform specific actions on template
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { action } = body;
    
    const templateIndex = emailTemplates.findIndex(t => t.id === id);
    
    if (templateIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Email template not found' },
        { status: 404 }
      );
    }

    let template = emailTemplates[templateIndex];

    switch (action) {
      case 'duplicate':
        const duplicatedTemplate = {
          ...template,
          id: Date.now().toString(),
          name: `${template.name} (Copy)`,
          status: 'draft',
          usageCount: 0,
          lastUsed: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        emailTemplates.push(duplicatedTemplate);
        
        return NextResponse.json({
          success: true,
          template: duplicatedTemplate,
          message: 'Template duplicated successfully'
        });

      case 'test':
        const { testEmail } = body;
        if (!testEmail) {
          return NextResponse.json(
            { success: false, error: 'Test email address is required' },
            { status: 400 }
          );
        }

        // Simulate sending test email
        console.log(`Test email sent to ${testEmail} for template: ${template.name}`);
        
        return NextResponse.json({
          success: true,
          message: `Test email sent to ${testEmail}`
        });

      case 'activate':
        template.status = 'active';
        template.updatedAt = new Date().toISOString();
        emailTemplates[templateIndex] = template;
        
        return NextResponse.json({
          success: true,
          template,
          message: 'Template activated successfully'
        });

      case 'deactivate':
        template.status = 'draft';
        template.updatedAt = new Date().toISOString();
        emailTemplates[templateIndex] = template;
        
        return NextResponse.json({
          success: true,
          template,
          message: 'Template deactivated successfully'
        });

      case 'archive':
        template.status = 'archived';
        template.updatedAt = new Date().toISOString();
        emailTemplates[templateIndex] = template;
        
        return NextResponse.json({
          success: true,
          template,
          message: 'Template archived successfully'
        });

      case 'use':
        // Track template usage
        template.usageCount += 1;
        template.lastUsed = new Date().toISOString();
        template.updatedAt = new Date().toISOString();
        emailTemplates[templateIndex] = template;
        
        return NextResponse.json({
          success: true,
          template,
          message: 'Template usage tracked'
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error performing template action:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to perform action' },
      { status: 500 }
    );
  }
}