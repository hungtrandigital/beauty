# Design Tokens

**Last Updated:** 2025-12-09  
**Version:** 1.0

## Overview

Design tokens are the foundational design decisions that define our visual language. These tokens ensure consistency across all interfaces and can be used in code, design tools, and documentation.

## Color Tokens

### Brand Colors

```css
:root {
  /* Primary Brand */
  --color-primary: #1A2B4A;        /* Deep Navy */
  --color-primary-hover: #152238;
  --color-primary-active: #0F1A2A;
  
  /* Accent Colors */
  --color-accent: #00A8A8;          /* Teal */
  --color-accent-hover: #008A8A;
  --color-accent-active: #006A6A;
  
  --color-accent-secondary: #D4AF37; /* Gold */
  --color-accent-secondary-hover: #B8941F;
  --color-accent-secondary-active: #9A7A0F;
}
```

### Neutral Colors

```css
:root {
  /* Text Colors */
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #4A4A4A;
  --color-text-tertiary: #8A8A8A;
  --color-text-inverse: #FFFFFF;
  
  /* Background Colors */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F5F5F5;
  --color-bg-tertiary: #E5E5E5;
  --color-bg-dark: #2A2A2A;
  
  /* Border Colors */
  --color-border: #E5E5E5;
  --color-border-hover: #CCCCCC;
  --color-border-focus: #00A8A8;
}
```

### Semantic Colors

```css
:root {
  /* Success */
  --color-success: #10B981;
  --color-success-light: #D1FAE5;
  --color-success-bg: #ECFDF5;
  
  /* Warning */
  --color-warning: #F59E0B;
  --color-warning-light: #FEF3C7;
  --color-warning-bg: #FFFBEB;
  
  /* Error */
  --color-error: #EF4444;
  --color-error-light: #FEE2E2;
  --color-error-bg: #FEF2F2;
  
  /* Info */
  --color-info: #3B82F6;
  --color-info-light: #DBEAFE;
  --color-info-bg: #EFF6FF;
}
```

## Typography Tokens

### Font Families

```css
:root {
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;
}
```

### Font Sizes

```css
:root {
  --font-size-display: 3rem;      /* 48px */
  --font-size-h1: 2.25rem;         /* 36px */
  --font-size-h2: 1.75rem;        /* 28px */
  --font-size-h3: 1.375rem;       /* 22px */
  --font-size-h4: 1.125rem;       /* 18px */
  --font-size-body-lg: 1.125rem;  /* 18px */
  --font-size-body: 1rem;          /* 16px */
  --font-size-body-sm: 0.875rem;   /* 14px */
  --font-size-caption: 0.75rem;    /* 12px */
}
```

### Font Weights

```css
:root {
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

### Line Heights

```css
:root {
  --line-height-tight: 1.2;
  --line-height-normal: 1.4;
  --line-height-relaxed: 1.6;
}
```

## Spacing Tokens

```css
:root {
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
  --spacing-2xl: 3rem;     /* 48px */
  --spacing-3xl: 4rem;     /* 64px */
  --spacing-4xl: 6rem;     /* 96px */
}
```

## Border Radius

```css
:root {
  --radius-sm: 0.25rem;    /* 4px */
  --radius-md: 0.5rem;     /* 8px */
  --radius-lg: 0.75rem;    /* 12px */
  --radius-xl: 1rem;       /* 16px */
  --radius-full: 9999px;   /* Full circle */
}
```

## Shadows

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
```

## Z-Index Scale

```css
:root {
  --z-base: 0;
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}
```

## Breakpoints

```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

## Animation Tokens

```css
:root {
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 350ms;
  
  --easing-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --easing-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Usage in Code

### CSS Variables

```css
.button-primary {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-semibold);
  transition: background-color var(--duration-normal) var(--easing-ease-out);
}

.button-primary:hover {
  background-color: var(--color-primary-hover);
}
```

### Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A2B4A',
          hover: '#152238',
          active: '#0F1A2A',
        },
        accent: {
          DEFAULT: '#00A8A8',
          hover: '#008A8A',
          active: '#006A6A',
        },
        // ... other colors
      },
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      // ... other tokens
    },
  },
}
```

## Related Documents

- **[Color Palette](../../brand-guidelines/color-palette.md)** - Color system details
- **[Typography](../../brand-guidelines/typography.md)** - Typography system details
- **[Components](components/)** - Component implementations

---

*Design tokens are the foundation of our design system. Use them consistently across all interfaces.*

