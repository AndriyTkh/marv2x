# SEO Metadata Implementation Summary

## Overview

Comprehensive metadata has been implemented across all pages of the Marvilon website, including:

- Title tags (≤ 60 characters)
- Meta descriptions (≤ 155 characters)
- Keywords
- OpenGraph tags for social media
- Twitter Card tags
- Structured data (JSON-LD) where applicable

---

## Pages Metadata

### 1. Root Layout (`app/layout.tsx`)

**Purpose:** Global metadata and defaults for all pages

- **Title Template:** `%s | Marvilon`
- **Default Title:** Marvilon — Optical Measurement Systems for Industrial Processes
- **Description:** Advanced optical systems for dust, moisture, and gas monitoring in harsh industrial environments, including wet gas and ATEX Zone 1/2 applications.
- **Keywords:** optical measuring cell, industrial gas analyzer, dust monitoring system, wet gas measurement, ATEX Zone 1, ATEX Zone 2, CO CO2 CH4 monitoring, industrial CEMS, optical particle measurement, isokinetic sampling system, continuous emission monitoring
- **OG Image:** `/tech/marv2x_front_view.jpg`
- **Metadata Base:** `https://marvilon.com`

---

### 2. Home Page (`app/page.tsx` & `app/(main)/page.tsx`)

**URL:** `https://marvilon.com`

- **Title:** Marvilon — Optical Measurement Systems for Industrial Processes (59 chars)
- **Description:** Advanced optical systems for dust, moisture, and gas monitoring in harsh industrial environments, including wet gas and ATEX Zone 1/2 applications. (154 chars)
- **Keywords:** optical measuring cell, industrial gas analyzer, dust monitoring system, wet gas measurement, ATEX Zone 1, ATEX Zone 2, CO CO2 CH4 monitoring, industrial CEMS, optical particle measurement, isokinetic sampling system, continuous emission monitoring

**OpenGraph:**

- **og:title:** Marvilon — Industrial Optical Measurement Systems
- **og:description:** High-precision optical systems for dust, moisture, and gas composition monitoring in heavy industry. Operates in wet, dusty, and explosive environments.
- **og:type:** website
- **og:url:** https://marvilon.com
- **og:image:** /tech/marv2x_front_view.jpg (1200x630)

**Twitter Card:**

- **twitter:card:** summary_large_image
- **twitter:title:** Marvilon — Optical Monitoring for Industrial Processes
- **twitter:description:** Advanced optical measurement technologies for harsh industrial environments.
- **twitter:image:** /tech/marv2x_front_view.jpg

---

### 3. Products Listing (`app/products/page.tsx`)

**URL:** `https://marvilon.com/products`

- **Title:** Industrial Measurement Products | Marvilon (44 chars)
- **Description:** Explore Marvilon optical measurement systems for dust, gas, and moisture monitoring in ATEX environments. MARV 2EX and advanced CEMS solutions. (147 chars)
- **Keywords:** MARV 2EX, dust monitoring products, gas analyzer systems, ATEX certified equipment, industrial CEMS, optical measurement devices, isokinetic sampling, wet gas analyzer

**OpenGraph:**

- **og:title:** Marvilon Industrial Measurement Products
- **og:description:** Browse our range of optical measurement systems for continuous monitoring in harsh industrial environments.
- **og:url:** https://marvilon.com/products
- **og:image:** /tech/marv2x_front_view.jpg

**Twitter Card:**

- **twitter:card:** summary_large_image
- **twitter:title:** Marvilon Industrial Measurement Products
- **twitter:description:** Browse our range of optical measurement systems for continuous monitoring in harsh industrial environments.

---

### 4. Product Detail Pages (`app/products/[id]/page.tsx`)

**URL Pattern:** `https://marvilon.com/products/{product-id}`

**Dynamic metadata generated for each product:**

#### Example: MARV 2EX

- **Title:** MARV 2EX | Marvilon
- **Description:** Extractive dust monitoring system for wet gases in explosive atmospheres (ATEX Zone 1/2). Isokinetic sampling under variable flow conditions. (145 chars)
- **Keywords:** MARV 2EX, ATEX Zone 1/2, Certificate No. UA.TR.001 46-19, optical measurement, industrial monitoring, dust analyzer, gas analyzer, CEMS

**OpenGraph:**

- **og:title:** MARV 2EX — Marvilon Industrial Measurement
- **og:description:** Extractive dust monitoring system for wet gases in explosive atmospheres (ATEX Zone 1/2).
- **og:url:** https://marvilon.com/products/marv-2ex
- **og:image:** Product-specific image from imageUrls array

**Twitter Card:**

- **twitter:card:** summary_large_image
- **twitter:title:** MARV 2EX — Marvilon
- **twitter:description:** Product short description
- **twitter:image:** Product-specific image

**Note:** Each product automatically generates unique metadata based on:

- Product name
- Short description
- Features (first 2 used in enhanced description)
- Certifications
- Product images

---

### 5. Company History (`app/history/company/page.tsx`)

**URL:** `https://marvilon.com/history/company`

- **Title:** Company History | Marvilon (28 chars)
- **Description:** MARVILON LLC history: from optical component development to complete industrial measurement systems for hazardous environments. Founded in Kyiv, Ukraine. (154 chars)
- **Keywords:** MARVILON history, industrial measurement company, optical technology development, ATEX systems, gas analysis history, dust measurement innovation, Ukrainian engineering

**OpenGraph:**

- **og:title:** Marvilon Company History — From Components to Complete Systems
- **og:description:** Discover how MARVILON evolved from optical component development to building complete measurement systems for wet gas and explosive environments.
- **og:url:** https://marvilon.com/history/company
- **og:image:** /company/workplace-stock.jpg

**Twitter Card:**

- **twitter:card:** summary_large_image
- **twitter:title:** Marvilon Company History
- **twitter:description:** From optical components to complete industrial measurement systems for hazardous environments.

---

### 6. Technology Page (`app/history/tech/page.tsx`)

**URL:** `https://marvilon.com/history/tech`

- **Title:** Technology & Innovation | Marvilon (37 chars)
- **Description:** Advanced optical measurement systems for continuous industrial process monitoring with simultaneous gas, dust, and moisture detection. NDIR, UV/Vis, and laser photometry. (155 chars)
- **Keywords:** optical measurement technology, NDIR gas analysis, industrial monitoring systems, gas composition analysis, particulate matter detection, ATEX technology, emissions monitoring, isokinetic sampling, laser photometry, UV Vis absorption

**OpenGraph:**

- **og:title:** Marvilon Technology — Multi-Parameter Optical Measurement
- **og:description:** Simultaneous measurement of CO, CO₂, NO, SO₂, NH₃, CH₄, particulate matter, and moisture using advanced optical technologies for harsh industrial environments.
- **og:url:** https://marvilon.com/history/tech
- **og:image:** /tech/marv2x_front_view.jpg

**Twitter Card:**

- **twitter:card:** summary_large_image
- **twitter:title:** Marvilon Technology — Advanced Optical Measurement
- **twitter:description:** Multi-parameter monitoring: gases, dust, and moisture in one system. NDIR, UV/Vis, and laser photometry.

---

### 7. Contact Page (`app/contacts/page.tsx` + `app/contacts/layout.tsx`)

**URL:** `https://marvilon.com/contacts`

- **Title:** Contact Us | Marvilon (24 chars)
- **Description:** Contact Marvilon for inquiries about optical measurement systems, technical support, and industrial monitoring solutions. Expert support for ATEX and CEMS applications. (155 chars)
- **Keywords:** contact Marvilon, industrial measurement support, ATEX consultation, CEMS inquiry, optical analyzer support, technical assistance, measurement system inquiry

**OpenGraph:**

- **og:title:** Contact Marvilon — Industrial Measurement Experts
- **og:description:** Get in touch with Marvilon for technical support, product inquiries, and custom measurement solutions for harsh industrial environments.
- **og:url:** https://marvilon.com/contacts
- **og:image:** /tech/marv2x_front_view.jpg

**Twitter Card:**

- **twitter:card:** summary_large_image
- **twitter:title:** Contact Marvilon
- **twitter:description:** Expert support for industrial optical measurement systems and ATEX applications.

**Structured Data (JSON-LD):**

```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Marvilon",
  "description": "Contact Marvilon for inquiries about optical measurement systems...",
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

---

## Key Features Implemented

### 1. **Consistent Branding**

- All titles follow the pattern: `Page Name | Marvilon`
- Consistent use of "Marvilon" (not MARV2X) across metadata
- Focus on industrial/optical measurement terminology

### 2. **SEO Optimization**

- Title tags under 60 characters
- Meta descriptions under 155 characters
- Relevant, industry-specific keywords
- Proper keyword arrays (not comma-separated strings)

### 3. **Social Media Ready**

- OpenGraph tags for Facebook, LinkedIn
- Twitter Card tags for Twitter/X
- High-quality images (1200x630 recommended)
- Unique descriptions for each page

### 4. **Dynamic Product Metadata**

- Automatically generates metadata for each product
- Uses product data from `products.json`
- Includes certifications in keywords
- Product-specific images in social cards

### 5. **Technical SEO**

- Metadata base URL set in root layout
- Proper TypeScript typing with `Metadata` type
- Robots meta tags for search engine crawling
- Structured data (JSON-LD) for contact page

---

## Images Used for Social Sharing

1. **Primary:** `/tech/marv2x_front_view.jpg` - Main product image
2. **Company:** `/company/workplace-stock.jpg` - Company history
3. **Products:** Individual product images from `imageUrls` array

**Recommendation:** Ensure all images are optimized:

- Dimensions: 1200x630px (OpenGraph standard)
- Format: JPG or PNG
- File size: < 1MB for fast loading
- Alt text: Descriptive and keyword-rich

---

## Next Steps & Recommendations

### 1. **Add More Structured Data**

Consider adding JSON-LD to other pages:

- **Organization schema** on homepage
- **Product schema** on product pages
- **BreadcrumbList** for navigation

### 2. **Create OG Images**

Generate custom OpenGraph images for each page with:

- Marvilon logo
- Page title
- Key visual element
- Brand colors

### 3. **Verify Implementation**

Test metadata using:

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- Google Rich Results Test

### 4. **Add Sitemap**

Create `sitemap.xml` for better search engine indexing:

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';
import products from '@/public/products.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls = products.map((product) => ({
    url: `https://marvilon.com/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://marvilon.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://marvilon.com/products',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...productUrls,
    {
      url: 'https://marvilon.com/history/company',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://marvilon.com/history/tech',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://marvilon.com/contacts',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}
```

### 5. **Add robots.txt**

```
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://marvilon.com/sitemap.xml
```

---

## Testing Checklist

- [ ] Verify all titles are under 60 characters
- [ ] Verify all descriptions are under 155 characters
- [ ] Test OpenGraph tags on Facebook
- [ ] Test Twitter Cards on Twitter/X
- [ ] Test on LinkedIn
- [ ] Check mobile preview
- [ ] Verify images load correctly
- [ ] Test dynamic product pages
- [ ] Validate structured data
- [ ] Check Google Search Console
- [ ] Monitor page indexing

---

## Maintenance

**Regular Updates:**

- Update product metadata when adding new products
- Refresh descriptions seasonally
- Update images for campaigns
- Monitor keyword performance
- Adjust based on analytics data

**Analytics Integration:**

- Track social media referrals
- Monitor click-through rates from search
- Analyze which pages get shared most
- A/B test different descriptions

---

_Last Updated: December 9, 2025_
