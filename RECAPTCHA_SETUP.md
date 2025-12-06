# reCAPTCHA Setup Instructions

## 1. Get reCAPTCHA Keys

1. Go to https://www.google.com/recaptcha/admin
2. Click "+" to create a new site
3. Fill in the form:
   - **Label**: MARV2X Contact Form
   - **reCAPTCHA type**: Select "reCAPTCHA v3"
   - **Domains**: Add your domain (e.g., `localhost` for testing, `yourdomain.com` for production)
4. Accept the terms and click "Submit"
5. You'll get two keys:
   - **Site Key** (public, used in frontend)
   - **Secret Key** (private, used in backend)

## 2. Add Keys to .env.local

Update your `.env.local` file with the keys:

```env
RESEND_API_KEY=re_dPdqfSbL_LagTTWMVgf9p24Aybw2EATu4

NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

## 3. Restart Development Server

After adding the keys, restart your dev server:

```bash
npm run dev
```

## Features Implemented

### Message Validation

- ✅ Minimum length: 20 characters
- ✅ Maximum length: 2000 characters
- ✅ Real-time character counter
- ✅ Visual feedback for invalid input

### Bot Protection

- ✅ Google reCAPTCHA v3 (invisible, no user interaction)
- ✅ Honeypot field (hidden trap for bots)
- ✅ Time-based validation (3 second minimum)
- ✅ Rate limiting (3 submissions per hour per IP)
- ✅ Spam keyword detection
- ✅ URL count validation (max 2 links)

### Score Threshold

reCAPTCHA v3 returns a score from 0.0 to 1.0:

- **1.0**: Very likely a good interaction
- **0.5**: Threshold (currently set)
- **0.0**: Very likely a bot

You can adjust the threshold in `app/api/contact/route.ts` if needed.

## Testing

For local testing, add `localhost` to your reCAPTCHA domains in the Google admin panel.

The form will show validation errors in real-time and prevent submission if:

- Message is too short or too long
- reCAPTCHA verification fails
- Rate limit is exceeded
- Spam patterns are detected
