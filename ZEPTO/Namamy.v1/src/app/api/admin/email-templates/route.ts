import { NextRequest, NextResponse } from 'next/server';

// Mock email templates data (in production, this would be from a database)
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
  },
  {
    id: '2',
    name: 'Welcome Email',
    subject: 'Welcome to Namamy - Your Healthy Snacking Journey Begins!',
    description: 'Welcome email for new customers',
    category: 'welcome',
    status: 'active',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #059669;">Welcome to Namamy!</h1>
        <p>Hi {customerName},</p>
        <p>Welcome to the Namamy family! We're excited to have you on board.</p>
        <p>Get ready to enjoy premium quality makhana (fox nuts) that are:</p>
        <ul>
          <li>100% Natural & Organic</li>
          <li>High in Protein & Low in Calories</li>
          <li>Perfect for Healthy Snacking</li>
        </ul>
        <p>Use code <strong>WELCOME10</strong> for 10% off your first order!</p>
        <a href="{shopUrl}" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Start Shopping</a>
      </div>
    `,
    textContent: 'Welcome to Namamy! Use code WELCOME10 for 10% off...',
    variables: ['customerName', 'shopUrl'],
    lastUsed: '2024-01-29T15:20:00Z',
    usageCount: 89,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },
  {
    id: '3',
    name: 'Order Shipped',
    subject: 'Your Namamy Order is On Its Way! 📦',
    description: 'Sent when order is shipped',
    category: 'order',
    status: 'active',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #059669;">Your order is on its way!</h1>
        <p>Hi {customerName},</p>
        <p>Great news! Your order #{orderNumber} has been shipped and is on its way to you.</p>
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
          <h3>Tracking Information:</h3>
          <p>Tracking Number: {trackingNumber}</p>
          <p>Estimated Delivery: {estimatedDelivery}</p>
          <p>Courier: {courierName}</p>
        </div>
        <a href="{trackingUrl}" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Track Your Order</a>
      </div>
    `,
    textContent: 'Your order #{orderNumber} has been shipped. Track with {trackingNumber}...',
    variables: ['customerName', 'orderNumber', 'trackingNumber', 'estimatedDelivery', 'courierName', 'trackingUrl'],
    lastUsed: '2024-01-30T08:45:00Z',
    usageCount: 198,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  },
  {
    id: '4',
    name: 'Password Reset',
    subject: 'Reset Your Namamy Password',
    description: 'Password reset email',
    category: 'system',
    status: 'active',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #059669;">Reset Your Password</h1>
        <p>Hi {customerName},</p>
        <p>We received a request to reset your password for your Namamy account.</p>
        <p>Click the button below to reset your password:</p>
        <a href="{resetUrl}" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Reset Password</a>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
    textContent: 'Reset your password: {resetUrl}',
    variables: ['customerName', 'resetUrl'],
    lastUsed: '2024-01-28T12:15:00Z',
    usageCount: 23,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  },
  {
    id: '5',
    name: 'Newsletter - Weekly Specials',
    subject: 'This Week\'s Special Offers Just for You! 🎉',
    description: 'Weekly newsletter with special offers',
    category: 'marketing',
    status: 'draft',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #059669;">This Week's Special Offers!</h1>
        <p>Hi {customerName},</p>
        <p>Don't miss out on these amazing deals this week:</p>
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>🔥 Hot Deals:</h3>
          <ul>
            <li>Premium Raw Makhana - 20% OFF</li>
            <li>Roasted Varieties - Buy 2 Get 1 Free</li>
            <li>Free Shipping on orders above ₹500</li>
          </ul>
        </div>
        <a href="{shopUrl}" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Shop Now</a>
      </div>
    `,
    textContent: 'Weekly specials: Premium Raw Makhana 20% OFF...',
    variables: ['customerName', 'shopUrl'],
    usageCount: 0,
    createdAt: '2024-01-25T00:00:00Z',
    updatedAt: '2024-01-25T00:00:00Z'
  }
];

// GET - Get all email templates
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let filteredTemplates = [...emailTemplates];

    // Apply filters
    if (category && category !== 'all') {
      filteredTemplates = filteredTemplates.filter(template => template.category === category);
    }

    if (status && status !== 'all') {
      filteredTemplates = filteredTemplates.filter(template => template.status === status);
    }

    if (search) {
      filteredTemplates = filteredTemplates.filter(template =>
        template.name.toLowerCase().includes(search.toLowerCase()) ||
        template.subject.toLowerCase().includes(search.toLowerCase()) ||
        template.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Calculate stats
    const stats = {
      total: emailTemplates.length,
      active: emailTemplates.filter(t => t.status === 'active').length,
      draft: emailTemplates.filter(t => t.status === 'draft').length,
      archived: emailTemplates.filter(t => t.status === 'archived').length,
      totalSent: emailTemplates.reduce((sum, t) => sum + t.usageCount, 0),
      categories: Array.from(new Set(emailTemplates.map(t => t.category))).length
    };

    return NextResponse.json({
      success: true,
      templates: filteredTemplates,
      stats,
      total: filteredTemplates.length
    });
  } catch (error) {
    console.error('Error fetching email templates:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch email templates' },
      { status: 500 }
    );
  }
}

// POST - Create new email template
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      subject,
      description,
      category,
      status = 'draft',
      htmlContent,
      textContent,
      variables = []
    } = body;

    // Validate required fields
    if (!name || !subject || !htmlContent) {
      return NextResponse.json(
        { success: false, error: 'Name, subject, and HTML content are required' },
        { status: 400 }
      );
    }

    // Create new template
    const newTemplate = {
      id: Date.now().toString(),
      name,
      subject,
      description: description || '',
      category: category || 'other',
      status,
      htmlContent,
      textContent: textContent || '',
      variables,
      lastUsed: '',
      usageCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    emailTemplates.push(newTemplate);

    console.log(`Email template created: ${name}`);

    return NextResponse.json({
      success: true,
      template: newTemplate,
      message: 'Email template created successfully'
    });
  } catch (error) {
    console.error('Error creating email template:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create email template' },
      { status: 500 }
    );
  }
}

// PUT - Update all templates (bulk operations)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, templateIds } = body;

    if (!action || !templateIds || !Array.isArray(templateIds)) {
      return NextResponse.json(
        { success: false, error: 'Action and template IDs are required' },
        { status: 400 }
      );
    }

    let updatedCount = 0;

    switch (action) {
      case 'activate':
        emailTemplates = emailTemplates.map(template => {
          if (templateIds.includes(template.id)) {
            updatedCount++;
            return { ...template, status: 'active', updatedAt: new Date().toISOString() };
          }
          return template;
        });
        break;

      case 'deactivate':
        emailTemplates = emailTemplates.map(template => {
          if (templateIds.includes(template.id)) {
            updatedCount++;
            return { ...template, status: 'draft', updatedAt: new Date().toISOString() };
          }
          return template;
        });
        break;

      case 'archive':
        emailTemplates = emailTemplates.map(template => {
          if (templateIds.includes(template.id)) {
            updatedCount++;
            return { ...template, status: 'archived', updatedAt: new Date().toISOString() };
          }
          return template;
        });
        break;

      case 'delete':
        const beforeLength = emailTemplates.length;
        emailTemplates = emailTemplates.filter(template => !templateIds.includes(template.id));
        updatedCount = beforeLength - emailTemplates.length;
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }

    console.log(`Bulk ${action} performed on ${updatedCount} email templates`);

    return NextResponse.json({
      success: true,
      message: `${updatedCount} templates ${action}d successfully`,
      updatedCount
    });
  } catch (error) {
    console.error('Error performing bulk operation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to perform bulk operation' },
      { status: 500 }
    );
  }
}