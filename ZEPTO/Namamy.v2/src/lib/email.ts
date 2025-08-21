import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'contact@namamy.com',
    pass: process.env.SMTP_PASS || 'your-app-password'
  }
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `"Namamy" <${process.env.SMTP_USER || 'contact@namamy.com'}>`,
      to,
      subject,
      text,
      html
    });

    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}

export function generateOrderConfirmationEmail(order: any) {
  const items = order.orderItems.map((item: any) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        ${item.product.name}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        ₹${item.price}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        ₹${item.total}
      </td>
    </tr>
  `).join('');

  const shippingAddress = JSON.parse(order.shippingAddress);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmation - Namamy</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <header style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #8B4513; margin: 0;">Namamy</h1>
          <p style="color: #666; margin: 5px 0;">Premium Makhana Products</p>
        </header>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #8B4513; margin-top: 0;">Order Confirmation</h2>
          <p>Dear ${order.user.name},</p>
          <p>Thank you for your order! We've received your order and it's being processed.</p>
          
          <div style="margin: 20px 0;">
            <strong>Order ID:</strong> ${order.id}<br>
            <strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-IN')}<br>
            <strong>Status:</strong> ${order.status}
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <h3>Order Items</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f5f5f5;">
                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Product</th>
                <th style="padding: 10px; text-align: center; border-bottom: 1px solid #ddd;">Qty</th>
                <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Price</th>
                <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${items}
            </tbody>
          </table>
        </div>

        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin-top: 0;">Order Summary</h3>
          <div style="display: flex; justify-content: space-between; margin: 5px 0;">
            <span>Subtotal:</span>
            <span>₹${(order.totalAmount - order.shippingAmount - order.taxAmount).toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin: 5px 0;">
            <span>Shipping:</span>
            <span>₹${order.shippingAmount.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin: 5px 0;">
            <span>Tax (GST):</span>
            <span>₹${order.taxAmount.toFixed(2)}</span>
          </div>
          <hr style="margin: 10px 0;">
          <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 18px;">
            <span>Total:</span>
            <span>₹${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <h3>Shipping Address</h3>
          <p>
            ${shippingAddress.name}<br>
            ${shippingAddress.address1}<br>
            ${shippingAddress.address2 ? shippingAddress.address2 + '<br>' : ''}
            ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.pincode}<br>
            ${shippingAddress.country}<br>
            Phone: ${shippingAddress.phone}
          </p>
        </div>

        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #2d5a2d;">What's Next?</h3>
          <ul style="margin: 0; padding-left: 20px;">
            <li>We'll process your order within 24 hours</li>
            <li>You'll receive tracking information once shipped</li>
            <li>Expected delivery: 3-5 business days</li>
          </ul>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p>Thank you for choosing Namamy!</p>
          <p style="color: #666; font-size: 14px;">
            For any questions, contact us at <a href="mailto:contact@namamy.com">contact@namamy.com</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateWelcomeEmail(user: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to Namamy</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <header style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #8B4513; margin: 0;">Welcome to Namamy!</h1>
          <p style="color: #666; margin: 5px 0;">Premium Makhana Products</p>
        </header>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #8B4513; margin-top: 0;">Hello ${user.name}!</h2>
          <p>Welcome to the Namamy family! We're excited to have you join our community of health-conscious food lovers.</p>
          
          <p>At Namamy, we're passionate about bringing you the finest quality makhana (fox nuts) - a superfood that's not only delicious but packed with nutrients.</p>
        </div>

        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #2d5a2d;">Why Choose Namamy?</h3>
          <ul style="margin: 0; padding-left: 20px;">
            <li>Premium quality makhana sourced directly from Bihar</li>
            <li>100% natural and organic products</li>
            <li>Traditional roasting techniques for authentic taste</li>
            <li>Rich in protein, low in calories</li>
            <li>Perfect for healthy snacking</li>
          </ul>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/shop" 
             style="background: #8B4513; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Start Shopping
          </a>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p>Thank you for choosing Namamy!</p>
          <p style="color: #666; font-size: 14px;">
            Follow us on social media for recipes, tips, and updates!
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}