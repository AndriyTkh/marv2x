# Email Setup Instructions

The contact form is ready, but you need to configure an email service to actually send emails.

## Option 1: Resend (Recommended for Next.js)

1. Install Resend:

```bash
npm install resend
```

2. Sign up at https://resend.com and get your API key

3. Add to `.env.local`:

```
RESEND_API_KEY=your_api_key_here
```

4. Update `app/api/contact/route.ts`:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Replace the TODO section with:
const { data, error } = await resend.emails.send({
  from: 'MARV2X <onboarding@resend.dev>', // Use your verified domain
  to: 'otherbadeng@gmail.com',
  subject: `Contact Form: ${topic || 'New Inquiry'} - ${firstName} ${lastName}`,
  text: emailContent,
  replyTo: email,
});

if (error) {
  throw new Error('Failed to send email');
}
```

## Option 2: Nodemailer (Gmail SMTP)

1. Install nodemailer:

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

2. Add to `.env.local`:

```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
```

3. Update `app/api/contact/route.ts`:

```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Replace the TODO section with:
await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: 'otherbadeng@gmail.com',
  subject: `Contact Form: ${topic || 'New Inquiry'} - ${firstName} ${lastName}`,
  text: emailContent,
  replyTo: email,
});
```

## Current Status

The form is fully functional and will:

- Validate all required fields (marked with \*)
- Show success/error messages
- Log submissions to console
- **But won't send actual emails until you configure one of the above options**

Choose your preferred method and follow the steps above!
