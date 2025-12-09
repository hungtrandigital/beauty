# Typography

**Last Updated:** 2025-12-09  
**Version:** 1.0

## Overview

Our typography system is designed for clarity, readability, and professional appearance across all digital interfaces and print materials. The typeface choices reflect our brand values: professional, modern, efficient, and accessible.

## Typeface Selection

### Primary Typeface: Inter

**Why Inter:**
- Designed specifically for digital interfaces
- Excellent readability at all sizes
- Supports Vietnamese characters (diacritics)
- Professional and modern
- Open source (free for commercial use)
- Wide range of weights (Thin to Black)

**Usage:** Primary typeface for all UI, web, and mobile applications

**Weights Available:**
- Thin (100)
- Extra Light (200)
- Light (300)
- Regular (400) - Default
- Medium (500) - Emphasis
- Semi Bold (600) - Headings
- Bold (700) - Strong emphasis
- Extra Bold (800)
- Black (900)

### Secondary Typeface: System Font Stack

**Fallback Stack:**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
  'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 
  'Droid Sans', 'Helvetica Neue', sans-serif;
```

**Why:** Ensures consistent appearance across all platforms and devices, with Inter as the preferred choice and system fonts as fallbacks.

### Monospace Typeface: JetBrains Mono

**Why:**
- Designed for code and technical content
- Excellent readability for numbers and data
- Supports Vietnamese characters
- Professional appearance

**Usage:** Code snippets, data tables, technical documentation, invoice numbers, product codes

**Weights Available:**
- Regular (400)
- Medium (500)
- Bold (700)

## Typography Scale

### Desktop Typography Scale

**Display (Hero)**
- **Size:** 48px / 3rem
- **Line Height:** 1.2 (57.6px)
- **Weight:** 700 (Bold)
- **Letter Spacing:** -0.02em
- **Usage:** Hero headlines, landing page titles

**H1 (Page Title)**
- **Size:** 36px / 2.25rem
- **Line Height:** 1.3 (46.8px)
- **Weight:** 700 (Bold)
- **Letter Spacing:** -0.01em
- **Usage:** Page titles, section headers

**H2 (Section Title)**
- **Size:** 28px / 1.75rem
- **Line Height:** 1.4 (39.2px)
- **Weight:** 600 (Semi Bold)
- **Letter Spacing:** 0
- **Usage:** Section headers, major subsections

**H3 (Subsection Title)**
- **Size:** 22px / 1.375rem
- **Line Height:** 1.4 (30.8px)
- **Weight:** 600 (Semi Bold)
- **Letter Spacing:** 0
- **Usage:** Subsection headers, card titles

**H4 (Minor Heading)**
- **Size:** 18px / 1.125rem
- **Line Height:** 1.5 (27px)
- **Weight:** 600 (Semi Bold)
- **Letter Spacing:** 0
- **Usage:** Minor headings, form labels

**Body Large**
- **Size:** 18px / 1.125rem
- **Line Height:** 1.6 (28.8px)
- **Weight:** 400 (Regular)
- **Letter Spacing:** 0
- **Usage:** Important body text, introductions

**Body (Default)**
- **Size:** 16px / 1rem
- **Line Height:** 1.6 (25.6px)
- **Weight:** 400 (Regular)
- **Letter Spacing:** 0
- **Usage:** Primary body text, paragraphs

**Body Small**
- **Size:** 14px / 0.875rem
- **Line Height:** 1.5 (21px)
- **Weight:** 400 (Regular)
- **Letter Spacing:** 0
- **Usage:** Secondary text, captions, metadata

**Caption**
- **Size:** 12px / 0.75rem
- **Line Height:** 1.5 (18px)
- **Weight:** 400 (Regular)
- **Letter Spacing:** 0.01em
- **Usage:** Fine print, timestamps, helper text

### Mobile Typography Scale

**Display (Hero)**
- **Size:** 32px / 2rem
- **Line Height:** 1.2 (38.4px)
- **Weight:** 700 (Bold)

**H1 (Page Title)**
- **Size:** 28px / 1.75rem
- **Line Height:** 1.3 (36.4px)
- **Weight:** 700 (Bold)

**H2 (Section Title)**
- **Size:** 24px / 1.5rem
- **Line Height:** 1.4 (33.6px)
- **Weight:** 600 (Semi Bold)

**H3 (Subsection Title)**
- **Size:** 20px / 1.25rem
- **Line Height:** 1.4 (28px)
- **Weight:** 600 (Semi Bold)

**Body (Default)**
- **Size:** 16px / 1rem
- **Line Height:** 1.6 (25.6px)
- **Weight:** 400 (Regular)

**Body Small**
- **Size:** 14px / 0.875rem
- **Line Height:** 1.5 (21px)
- **Weight:** 400 (Regular)

## Typography Hierarchy

### Visual Hierarchy Principles

1. **Size Contrast:** Use clear size differences to establish hierarchy
2. **Weight Contrast:** Use font weights strategically (Regular for body, Semi Bold/Bold for headings)
3. **Color Contrast:** Use text colors to reinforce hierarchy
4. **Spacing:** Use whitespace to separate and group content

### Heading Structure

**Best Practices:**
- Use H1 once per page (page title)
- Use H2 for major sections
- Use H3 for subsections
- Use H4 sparingly for minor divisions
- Maintain logical heading order (don't skip levels)

**Example:**
```
H1: Product Management
  H2: Product Catalog
    H3: Regular Products
    H3: Dye Products
  H2: Inventory Management
    H3: Central Warehouse
    H3: Branch Distribution
```

## Text Styles

### Paragraphs

**Default Paragraph:**
- Font: Inter Regular (400)
- Size: 16px
- Line Height: 1.6
- Color: Primary Text (#1A1A1A)
- Max Width: 65-75 characters (for readability)

**Long-form Content:**
- Increase line height to 1.7-1.8 for better readability
- Use larger font size (18px) for important content
- Add paragraph spacing (1.5em margin-bottom)

### Links

**Default Link:**
- Color: Teal (#00A8A8)
- Weight: 400 (Regular)
- Text Decoration: Underline on hover
- Hover: Darker teal (#008A8A)

**Link States:**
- Default: Teal (#00A8A8)
- Hover: Darker teal (#008A8A), underline
- Active: Deep Navy (#1A2B4A)
- Visited: Slightly muted teal (#00A8A8 with 80% opacity)

### Emphasis

**Bold Text:**
- Weight: 600 (Semi Bold) or 700 (Bold)
- Usage: Important terms, key concepts, emphasis

**Italic Text:**
- Style: Italic
- Usage: Quotes, citations, subtle emphasis (use sparingly)

**Underline:**
- Usage: Links only (avoid for emphasis)

### Lists

**Unordered Lists:**
- Bullet: Custom teal circle (•)
- Indent: 1.5em
- Line Height: 1.6
- Spacing: 0.5em between items

**Ordered Lists:**
- Numbering: Teal numbers
- Indent: 1.5em
- Line Height: 1.6
- Spacing: 0.5em between items

## Vietnamese Language Support

### Diacritics and Special Characters

**Requirements:**
- Inter supports all Vietnamese diacritics (ă, â, đ, ê, ô, ơ, ư)
- Ensure proper rendering of tone marks (á, à, ả, ã, ạ)
- Test with common Vietnamese business terms

**Common Terms:**
- "Thu ngân" (Cashier)
- "Thủ kho" (Warehouse Manager)
- "Chi nhánh" (Branch)
- "Sản phẩm" (Product)
- "Kho hàng" (Warehouse)

### Text Direction

- Left-to-right (LTR) for all content
- Vietnamese follows LTR standard

## Data & Numbers

### Numeric Display

**Large Numbers:**
- Use JetBrains Mono for financial data, statistics
- Size: 24px-32px for prominent numbers
- Weight: 600 (Semi Bold) or 700 (Bold)
- Color: Deep Navy or Teal for emphasis

**Tables:**
- Headers: Inter Semi Bold (600), 14px
- Body: Inter Regular (400), 14px
- Numbers: JetBrains Mono Regular (400), 14px
- Alignment: Right-align numbers, left-align text

**Currency:**
- Format: "1,000,000 VND" or "1.000.000 ₫"
- Use JetBrains Mono for currency amounts
- Include currency symbol (₫) or "VND"

## Accessibility

### Minimum Font Sizes

**Body Text:**
- Minimum: 14px (mobile), 16px (desktop)
- Recommended: 16px (mobile), 16px (desktop)

**Headings:**
- Minimum: 18px (mobile), 20px (desktop)
- Recommended: 20px (mobile), 22px+ (desktop)

### Line Height

**Minimum:**
- 1.4 for headings
- 1.5 for body text
- 1.6 recommended for body text

### Letter Spacing

**Headings:**
- Slight negative tracking (-0.01em to -0.02em) for large headings
- Normal tracking (0) for smaller headings

**Body Text:**
- Normal tracking (0) for body text
- Slight positive tracking (0.01em) for small text

## Implementation

### CSS Typography System

```css
:root {
  /* Font Families */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;
  
  /* Font Sizes */
  --font-size-display: 3rem;      /* 48px */
  --font-size-h1: 2.25rem;         /* 36px */
  --font-size-h2: 1.75rem;        /* 28px */
  --font-size-h3: 1.375rem;       /* 22px */
  --font-size-h4: 1.125rem;       /* 18px */
  --font-size-body-lg: 1.125rem;  /* 18px */
  --font-size-body: 1rem;          /* 16px */
  --font-size-body-sm: 0.875rem;  /* 14px */
  --font-size-caption: 0.75rem;    /* 12px */
  
  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-normal: 1.4;
  --line-height-relaxed: 1.6;
  
  /* Font Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

### Usage Examples

**Heading:**
```css
.heading-1 {
  font-family: var(--font-primary);
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
}
```

**Body Text:**
```css
.body-text {
  font-family: var(--font-primary);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-primary);
}
```

## Print Typography

### Print Considerations

**Font Sizes:**
- Increase base size by 10-20% for print
- Minimum 12pt for body text
- 14-16pt recommended for body text

**Line Height:**
- Increase to 1.7-1.8 for print readability
- More generous spacing between paragraphs

**Colors:**
- Use CMYK values for print
- Ensure sufficient contrast
- Test print samples

---

**Related Documents:**
- [Color Palette](color-palette.md) - Color system
- [UI/UX Mood & Tone](ui-ux-mood-tone.md) - Design mood guidelines
- [Brand Story](brand-story.md) - Brand narrative

