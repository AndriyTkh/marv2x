import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend lazily to avoid build-time errors
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(apiKey);
}

/**
 * API endpoint for spec download requests
 *
 * Receives form data from AccessGateForm and stores it for lead tracking.
 * Returns success/error responses to control the modal and download flow.
 *
 * Requirements: 9.1, 9.2, 9.3, 9.4, 9.5
 */

interface SpecRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  country: string;
  phone?: string;
  productId: string;
  timestamp?: string;
  recaptchaToken?: string;
}

/**
 * Verify reCAPTCHA token with Google's API
 * Requirements: 9.3
 */
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
    const body: SpecRequestBody = await request.json();

    // Validate reCAPTCHA token (requirement 9.3)
    if (!body.recaptchaToken) {
      return NextResponse.json({ error: 'reCAPTCHA token missing' }, { status: 400 });
    }

    const isHuman = await verifyRecaptcha(body.recaptchaToken);
    if (!isHuman) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 },
      );
    }

    // Validate required fields (requirement 9.2)
    const { firstName, lastName, email, company, country, phone, productId } = body;

    if (!firstName || !lastName || !email || !company || !country || !productId) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: firstName, lastName, email, company, country, and productId are required',
        },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Validate name lengths (2-50 characters)
    if (firstName.length < 2 || firstName.length > 50) {
      return NextResponse.json(
        { error: 'First name must be between 2 and 50 characters' },
        { status: 400 },
      );
    }

    if (lastName.length < 2 || lastName.length > 50) {
      return NextResponse.json(
        { error: 'Last name must be between 2 and 50 characters' },
        { status: 400 },
      );
    }

    // Validate company (2-100 characters)
    if (company.length < 2 || company.length > 100) {
      return NextResponse.json(
        { error: 'Company name must be between 2 and 100 characters' },
        { status: 400 },
      );
    }

    // Validate country (not empty)
    if (!country.trim()) {
      return NextResponse.json({ error: 'Country is required' }, { status: 400 });
    }

    // Validate phone if provided (optional)
    if (phone) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(phone) || phone.length > 20) {
        return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 });
      }
    }

    // TODO: Store form submission in database or file system (requirement 9.2)
    // For now, we'll just log it
    const timestamp = body.timestamp || new Date().toISOString();
    console.log('Spec request received:', {
      firstName,
      lastName,
      email,
      company,
      country,
      phone: phone || 'Not provided',
      productId,
      timestamp,
    });

    // Format submission date
    const submissionDate = new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
    });

    // Get IP address for logging
    const ip =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Prepare plain text email content
    const emailText = `
╔════════════════════════════════════════════════════════════╗
║         PRODUCT SPEC REQUEST - MARV2X                      ║
╚════════════════════════════════════════════════════════════╝

📅 Submitted: ${submissionDate}

┌─ CONTACT INFORMATION ──────────────────────────────────────┐
│
│  👤 Name:        ${firstName} ${lastName}
│  📧 Email:       ${email}
│  🏢 Company:     ${company}
│  🌍 Country:     ${country}
${phone ? `│  📞 Phone:       ${phone}` : ''}
│
└────────────────────────────────────────────────────────────┘

┌─ REQUEST DETAILS ──────────────────────────────────────────┐
│
│  📦 Product ID:  ${productId}
│  📄 Action:      Spec Sheet Download Request
│
└────────────────────────────────────────────────────────────┘

┌─ METADATA ─────────────────────────────────────────────────┐
│
│  🌐 IP Address:  ${ip}
│  🔒 Verified:    reCAPTCHA v3 passed
│  ⏰ Timestamp:   ${timestamp}
│
└────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This user has requested product specifications for ${productId}.
Reply directly to this email to follow up with ${firstName}.
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
    .highlight-box { background: #f0f7f7; border-left: 4px solid #38605f; padding: 15px; margin-top: 10px; border-radius: 4px; }
    .footer { background: #f9f9f9; padding: 20px 30px; text-align: center; font-size: 13px; color: #666; border-top: 1px solid #e0e0e0; }
    .badge { display: inline-block; background: #e8f5e9; color: #2e7d32; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📄 Product Spec Request</h1>
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
          <div class="info-label">Email:</div>
          <div class="info-value"><a href="mailto:${email}" style="color: #38605f;">${email}</a></div>
        </div>
        <div class="info-row">
          <div class="info-label">Company:</div>
          <div class="info-value">${company}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Country:</div>
          <div class="info-value">${country}</div>
        </div>
        ${
          phone
            ? `<div class="info-row">
          <div class="info-label">Phone:</div>
          <div class="info-value">${phone}</div>
        </div>`
            : ''
        }
      </div>

      <div class="section">
        <div class="section-title">📦 Request Details</div>
        <div class="highlight-box">
          <div style="font-size: 14px; color: #666; margin-bottom: 8px;">Product Requested:</div>
          <div style="font-size: 18px; font-weight: 600; color: #38605f;">${productId}</div>
          <div style="font-size: 13px; color: #999; margin-top: 8px;">Action: Spec Sheet Download</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">🔒 Security & Metadata</div>
        <div class="info-row">
          <div class="info-label">IP Address:</div>
          <div class="info-value">${ip}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Timestamp:</div>
          <div class="info-value">${timestamp}</div>
        </div>
        <span class="badge">✓ reCAPTCHA Verified</span>
      </div>
    </div>

    <div class="footer">
      <p><strong>This user has requested product specifications.</strong></p>
      <p style="margin-top: 10px;">Reply directly to this email to follow up with ${firstName}.</p>
      <p style="margin-top: 10px; font-size: 12px; color: #999;">
        This request was submitted via the MARV2X spec download form.
      </p>
    </div>
  </div>
</body>
</html>
    `.trim();

    // Send email notification using Resend
    try {
      const resend = getResendClient();
      const { data, error } = await resend.emails.send({
        from: 'MARVILON Spec Requests <onboarding@resend.dev>',
        to: ['sergtkh@gmail.com'],
        subject: `[Spec Request] ${productId} - ${firstName} ${lastName}`,
        text: emailText,
        html: emailHtml,
        replyTo: email,
      });

      if (error) {
        console.error('Resend error:', error);
        // Don't fail the request if email fails, but log it
      } else {
        console.log('Spec request email sent successfully:', data);
      }
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the request if email fails
    }

    // Return success response (requirement 9.4)
    return NextResponse.json(
      {
        success: true,
        message: 'Spec request submitted successfully',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error processing spec request:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request. Please try again.' },
      { status: 500 },
    );
  }
}
