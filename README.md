# Marvilon

Company website built for a real client. Responsive, performant, TypeScript throughout.

**Live:** [marv2x.vercel.app](https://marv2x.vercel.app)

## Features

- Contact form with Google reCAPTCHA v3 validation
- Email delivery via Resend
- Vercel Analytics
- Deployable to both Vercel and Cloudflare Workers

## Stack

`Next.js` · `TypeScript` · `React` · `Tailwind CSS` · `Resend` · `Cloudflare Workers`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

**Vercel** — push to main, auto-deploys via Vercel integration.

**Cloudflare Workers:**
```bash
npm run preview   # local preview
npm run deploy    # deploy to Cloudflare
```

## Environment Variables

```env
RESEND_API_KEY=
RECAPTCHA_SECRET_KEY=
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
```
