# Metadata Testing Guide

## Quick Testing Checklist

After deploying your site, use these tools to verify your metadata is working correctly.

---

## 1. Social Media Preview Tools

### Facebook / Meta

**Tool:** [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

**How to use:**

1. Enter your URL (e.g., `https://marvilon.com`)
2. Click "Debug"
3. Check the preview shows:
   - Correct title
   - Correct description
   - Correct image (1200x630)
4. Click "Scrape Again" if you made changes

**Test these URLs:**

- `https://marvilon.com`
- `https://marvilon.com/products`
- `https://marvilon.com/products/marv-2ex`
- `https://marvilon.com/history/company`
- `https://marvilon.com/history/tech`
- `https://marvilon.com/contacts`

---

### Twitter / X

**Tool:** [Twitter Card Validator](https://cards-dev.twitter.com/validator)

**How to use:**

1. Enter your URL
2. Click "Preview card"
3. Verify the card shows:
   - Correct title
   - Correct description
   - Correct image
   - Card type: `summary_large_image`

**Note:** You may need to be logged into Twitter to use this tool.

---

### LinkedIn

**Tool:** [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

**How to use:**

1. Enter your URL
2. Click "Inspect"
3. Check the preview
4. If needed, click "Inspect" again to refresh cache

---

## 2. Search Engine Tools

### Google Rich Results Test

**Tool:** [Google Rich Results Test](https://search.google.com/test/rich-results)

**How to use:**

1. Enter your URL
2. Click "Test URL"
3. Check for:
   - Valid structured data (JSON-LD)
   - No errors or warnings
   - Proper schema markup

**Pages with structured data:**

- Contact page (`/contacts`) - ContactPage schema

---

### Google Search Console

**Tool:** [Google Search Console](https://search.google.com/search-console)

**Setup:**

1. Add your property (marvilon.com)
2. Verify ownership
3. Submit sitemap: `https://marvilon.com/sitemap.xml`

**Monitor:**

- Page indexing status
- Coverage issues
- Mobile usability
- Core Web Vitals
- Search performance

---

## 3. Manual Browser Testing

### View Page Source

1. Visit any page
2. Right-click → "View Page Source"
3. Search for these tags:

```html
<!-- Title -->
<title>Marvilon — Optical Measurement Systems for Industrial Processes</title>

<!-- Meta Description -->
<meta
  name="description"
  content="Advanced optical systems for dust, moisture, and gas monitoring..."
/>

<!-- OpenGraph -->
<meta property="og:title" content="Marvilon — Industrial Optical Measurement Systems" />
<meta property="og:description" content="High-precision optical systems..." />
<meta property="og:image" content="https://marvilon.com/tech/marv2x_front_view.jpg" />
<meta property="og:url" content="https://marvilon.com" />
<meta property="og:type" content="website" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Marvilon — Optical Monitoring for Industrial Processes" />
<meta name="twitter:description" content="Advanced optical measurement technologies..." />
<meta name="twitter:image" content="https://marvilon.com/tech/marv2x_front_view.jpg" />
```

---

### Browser DevTools

1. Open DevTools (F12)
2. Go to "Elements" tab
3. Expand `<head>` section
4. Verify all meta tags are present

---

## 4. SEO Analysis Tools

### Screaming Frog SEO Spider

**Tool:** [Screaming Frog](https://www.screamingfrogseoseo.com/)

**Free version allows:**

- Crawl up to 500 URLs
- Check all meta titles
- Check all meta descriptions
- Find missing metadata
- Identify duplicate content

**How to use:**

1. Download and install
2. Enter your domain
3. Click "Start"
4. Review:
   - Page Titles tab
   - Meta Description tab
   - Images tab (check alt text)

---

### Lighthouse (Chrome DevTools)

**Built into Chrome**

**How to use:**

1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "SEO" category
4. Click "Analyze page load"

**Check for:**

- Meta description present
- Title tag present
- Document has valid hreflang
- Links are crawlable
- Image alt attributes

---

## 5. Mobile Testing

### Google Mobile-Friendly Test

**Tool:** [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

**How to use:**

1. Enter your URL
2. Click "Test URL"
3. Verify page is mobile-friendly
4. Check for any mobile usability issues

---

### Responsive Design Mode

**In Browser:**

1. Open DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Test different screen sizes:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1920px)

---

## 6. Sitemap & Robots Testing

### Sitemap

**URL:** `https://marvilon.com/sitemap.xml`

**Verify:**

- File loads correctly
- All pages are listed
- URLs are absolute (include domain)
- lastModified dates are present
- Priority values are set

**Expected pages:**

- Homepage
- Products listing
- All product detail pages (marv-2ex, product-2, product-3, product-4)
- Company history
- Technology page
- Contact page

---

### Robots.txt

**URL:** `https://marvilon.com/robots.txt`

**Verify:**

- File loads correctly
- Contains: `User-agent: *`
- Contains: `Allow: /`
- Contains: `Sitemap: https://marvilon.com/sitemap.xml`

---

## 7. Image Optimization Check

### OpenGraph Images

**Verify each image:**

- Dimensions: 1200x630px (recommended)
- Format: JPG or PNG
- File size: < 1MB
- Loads correctly
- Has descriptive alt text

**Images to check:**

- `/tech/marv2x_front_view.jpg` (main)
- `/company/workplace-stock.jpg` (company history)
- Product images from products.json

**Test image URLs:**

```
https://marvilon.com/tech/marv2x_front_view.jpg
https://marvilon.com/company/workplace-stock.jpg
```

---

## 8. Structured Data Validation

### Contact Page Schema

**URL:** `https://marvilon.com/contacts`

**Expected schema:**

```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Marvilon",
  "description": "...",
  "url": "https://marvilon.com/contacts",
  "mainEntity": {
    "@type": "Organization",
    "name": "Marvilon LLC",
    "email": "otherbadeng@gmail.com",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "availableLanguage": ["English"]
    }
  }
}
```

**Validate using:**

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

---

## 9. Character Count Verification

### Title Tags (≤ 60 characters)

- ✓ Home: "Marvilon — Optical Measurement Systems for Industrial Processes" (59)
- ✓ Products: "Industrial Measurement Products | Marvilon" (44)
- ✓ Company: "Company History | Marvilon" (28)
- ✓ Tech: "Technology & Innovation | Marvilon" (37)
- ✓ Contact: "Contact Us | Marvilon" (24)
- ✓ Product pages: "{Product Name} | Marvilon"

### Meta Descriptions (≤ 155 characters)

Check each page's description length:

```javascript
// In browser console:
document.querySelector('meta[name="description"]').content.length;
```

All should be ≤ 155 characters.

---

## 10. Testing Checklist

### Pre-Launch

- [ ] All pages have unique titles
- [ ] All pages have unique descriptions
- [ ] All titles are ≤ 60 characters
- [ ] All descriptions are ≤ 155 characters
- [ ] All images load correctly
- [ ] OpenGraph tags are present on all pages
- [ ] Twitter Card tags are present on all pages
- [ ] Sitemap.xml is accessible
- [ ] Robots.txt is accessible
- [ ] Structured data validates (contact page)

### Post-Launch

- [ ] Test all URLs in Facebook Debugger
- [ ] Test all URLs in Twitter Card Validator
- [ ] Test all URLs in LinkedIn Post Inspector
- [ ] Submit sitemap to Google Search Console
- [ ] Run Lighthouse SEO audit
- [ ] Check mobile-friendliness
- [ ] Verify images in social previews
- [ ] Monitor indexing in Search Console

### Weekly Monitoring

- [ ] Check Search Console for errors
- [ ] Monitor page indexing status
- [ ] Review search performance
- [ ] Check for crawl errors
- [ ] Monitor Core Web Vitals

---

## Common Issues & Fixes

### Issue: Social media shows old preview

**Fix:** Use the "Scrape Again" or "Refresh" button in the respective debugger tool.

### Issue: Image not showing in preview

**Fix:**

- Verify image URL is absolute (includes domain)
- Check image file exists and loads
- Ensure image is at least 200x200px
- Recommended: 1200x630px

### Issue: Description too long

**Fix:** Edit the metadata description to be ≤ 155 characters.

### Issue: Sitemap not found

**Fix:**

- Verify `app/sitemap.ts` exists
- Build and deploy the site
- Check `https://marvilon.com/sitemap.xml` loads

### Issue: Duplicate titles

**Fix:** Ensure each page has a unique title in its metadata.

---

## Performance Tips

1. **Optimize images** before uploading
2. **Use WebP format** for better compression
3. **Lazy load** images below the fold
4. **Minify** CSS and JavaScript
5. **Enable caching** on your server
6. **Use CDN** for static assets

---

## Resources

- [Next.js Metadata Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [OpenGraph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)

---

_Last Updated: December 9, 2025_
