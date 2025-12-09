# Design System

**Last Updated:** 2025-12-09  
**Version:** 1.0

## Overview

This design system provides reusable UI components, design tokens, and implementation guidelines for the Barbershop/Beauty Chain Management System. All components follow brand guidelines and are designed for simplicity, accessibility, and the Vietnamese market.

## Design Principles

1. **Simplicity First** - Designed for users with limited tech experience
2. **Visual Clarity** - Clear hierarchy, generous spacing, readable typography
3. **Accessibility** - WCAG 2.1 AA minimum compliance
4. **Vietnamese-First** - Supports Vietnamese language, local formats, cultural context
5. **Consistent** - Reusable components across all interfaces

## Design Tokens

See [design-tokens.md](design-tokens.md) for complete token definitions.

## Components

### Foundation Components
- [Buttons](components/buttons.md)
- [Forms](components/forms.md)
- [Cards](components/cards.md)
- [Navigation](components/navigation.md)
- [Typography](components/typography.md)
- [Icons](components/icons.md)

### Layout Components
- [Grid System](components/grid.md)
- [Spacing](components/spacing.md)
- [Containers](components/containers.md)

### Data Display
- [Tables](components/tables.md)
- [Lists](components/lists.md)
- [Badges](components/badges.md)
- [Status Indicators](components/status.md)

### Feedback Components
- [Alerts](components/alerts.md)
- [Toasts](components/toasts.md)
- [Loading States](components/loading.md)
- [Empty States](components/empty-states.md)

### Business-Specific Components
- [Inventory Cards](components/inventory-cards.md)
- [Bill Components](components/bill-components.md)
- [Recommendation Cards](components/recommendation-cards.md)
- [Dashboard Widgets](components/dashboard-widgets.md)

## Usage Guidelines

### When to Use Components

**Always use design system components for:**
- Consistent UI across all screens
- Faster development
- Accessibility compliance
- Brand consistency

**Customize only when:**
- Business-specific requirements
- Unique use cases not covered
- After consulting design system maintainer

### Implementation

**Frontend Framework:** Next.js 14+ with Tailwind CSS + shadcn/ui
**Component Library:** shadcn/ui (customizable, accessible)
**Styling:** Tailwind CSS with design tokens

## Related Documents

- **[Brand Guidelines](../../brand-guidelines/README.md)** - Brand foundation
- **[Color Palette](../../brand-guidelines/color-palette.md)** - Color system
- **[Typography](../../brand-guidelines/typography.md)** - Typography system
- **[UI/UX Mood & Tone](../../brand-guidelines/ui-ux-mood-tone.md)** - Design mood

---

*Keep this design system updated as components evolve and new patterns emerge.*

