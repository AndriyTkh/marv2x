import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { checkRateLimit } from './rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY not configured');
    return false;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    // Score ranges from 0.0 to 1.0, where 1.0 is very likely a good interaction
    // 0.5 is a reasonable threshold
    return data.success && data.score >= 0.5;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get IP address for rate limiting
    const ip =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Check rate limit: 3 submissions per hour per IP
    if (!checkRateLimit(ip, 3, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 },
      );
    }

    const body = await request.json();
    const {
      firstName,
      lastName,
      company,
      email,
      phone,
      country,
      city,
      postalCode,
      topic,
      message,
      recaptchaToken,
    } = body;

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json({ error: 'reCAPTCHA token missing' }, { status: 400 });
    }

    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 },
      );
    }

    // Validate required fields
    if (!firstName || !lastName || !company || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Message length validation
    if (message.length < 20 || message.length > 2000) {
      return NextResponse.json(
        { error: 'Message must be between 20 and 2000 characters' },
        { status: 400 },
      );
    }

    // Spam keyword detection
    const spamKeywords = [
      'viagra',
      'casino',
      'lottery',
      'click here',
      'buy now',
      'limited time',
      'act now',
      'free money',
    ];
    const messageText = message.toLowerCase();
    if (spamKeywords.some((keyword) => messageText.includes(keyword))) {
      return NextResponse.json({ error: 'Invalid content detected' }, { status: 400 });
    }

    // Check for excessive URLs (common in spam)
    const urlCount = (message.match(/https?:\/\//gi) || []).length;
    if (urlCount > 2) {
      return NextResponse.json({ error: 'Too many links in message' }, { status: 400 });
    }

    // Format submission date
    const submissionDate = new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
    });

    // Prepare plain text email content
    const emailText = `
╔════════════════════════════════════════════════════════════╗
║           NEW CONTACT FORM SUBMISSION - MARV2X             ║
╚════════════════════════════════════════════════════════════╝

📅 Submitted: ${submissionDate}

┌─ CONTACT INFORMATION ──────────────────────────────────────┐
│
│  👤 Name:        ${firstName} ${lastName}
│  🏢 Company:     ${company}
│  📧 Email:       ${email}
│  📱 Phone:       ${phone || 'Not provided'}
│
└────────────────────────────────────────────────────────────┘

┌─ LOCATION ─────────────────────────────────────────────────┐
│
│  🌍 Country:     ${country || 'Not provided'}
│  🏙️  City:        ${city || 'Not provided'}
│  📮 Postal Code: ${postalCode || 'Not provided'}
│
└────────────────────────────────────────────────────────────┘

┌─ INQUIRY DETAILS ──────────────────────────────────────────┐
│
│  📋 Topic:       ${topic || 'General Inquiry'}
│
│  💬 Message:
│  ${message.split('\n').join('\n│  ')}
│
└────────────────────────────────────────────────────────────┘

┌─ METADATA ─────────────────────────────────────────────────┐
│
│  🌐 IP Address:  ${ip}
│  🔒 Verified:    reCAPTCHA v3 passed
│
└────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Reply directly to this email to respond to ${firstName}.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    // Prepare HTML email content
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #38605f 0%, #5a8a88 100%); color: white; padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
    .header p { margin: 10px 0 0; opacity: 0.9; font-size: 14px; }
    .content { padding: 30px; }
    .section { margin-bottom: 25px; }
    .section-title { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #38605f; font-weight: 600; margin-bottom: 12px; border-bottom: 2px solid #38605f; padding-bottom: 5px; }
    .info-row { display: flex; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
    .info-label { font-weight: 600; color: #666; min-width: 120px; }
    .info-value { color: #333; flex: 1; }
    .message-box { background: #f9f9f9; border-left: 4px solid #38605f; padding: 15px; margin-top: 10px; border-radius: 4px; white-space: pre-wrap; word-wrap: break-word; }
    .footer { background: #f9f9f9; padding: 20px 30px; text-align: center; font-size: 13px; color: #666; border-top: 1px solid #e0e0e0; }
    .badge { display: inline-block; background: #e8f5e9; color: #2e7d32; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🌿 New Contact Form Submission</h1>
      <p>${submissionDate}</p>
    </div>
    
    <div class="content">
      <div class="section">
        <div class="section-title">👤 Contact Information</div>
        <div class="info-row">
          <div class="info-label">Name:</div>
          <div class="info-value"><strong>${firstName} ${lastName}</strong></div>
        </div>
        <div class="info-row">
          <div class="info-label">Company:</div>
          <div class="info-value">${company}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Email:</div>
          <div class="info-value"><a href="mailto:${email}" style="color: #38605f;">${email}</a></div>
        </div>
        <div class="info-row">
          <div class="info-label">Phone:</div>
          <div class="info-value">${phone || '<em>Not provided</em>'}</div>
        </div>
      </div>

      ${
        country || city || postalCode
          ? `
      <div class="section">
        <div class="section-title">🌍 Location</div>
        ${country ? `<div class="info-row"><div class="info-label">Country:</div><div class="info-value">${country}</div></div>` : ''}
        ${city ? `<div class="info-row"><div class="info-label">City:</div><div class="info-value">${city}</div></div>` : ''}
        ${postalCode ? `<div class="info-row"><div class="info-label">Postal Code:</div><div class="info-value">${postalCode}</div></div>` : ''}
      </div>
      `
          : ''
      }

      <div class="section">
        <div class="section-title">📋 Inquiry Details</div>
        <div class="info-row">
          <div class="info-label">Topic:</div>
          <div class="info-value"><strong>${topic || 'General Inquiry'}</strong></div>
        </div>
        <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
      </div>

      <div class="section">
        <div class="section-title">🔒 Security</div>
        <div class="info-row">
          <div class="info-label">IP Address:</div>
          <div class="info-value">${ip}</div>
        </div>
        <span class="badge">✓ reCAPTCHA Verified</span>
      </div>
    </div>

    <div class="footer">
      <p><strong>Reply directly to this email to respond to ${firstName}.</strong></p>
      <p style="margin-top: 10px; font-size: 12px; color: #999;">
        This message was sent via the MARV2X contact form.
      </p>
    </div>
  </div>
</body>
</html>
    `.trim();

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'MARV2X Contact <onboarding@resend.dev>',
      to: 'otherbadeng@gmail.com',
      subject: `${topic ? `[${topic}]` : '[New Inquiry]'} ${firstName} ${lastName} - ${company}`,
      text: emailText,
      html: emailHtml,
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error('Failed to send email');
    }

    console.log('Email sent successfully:', data);

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
