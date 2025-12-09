# Barbershop/Beauty Chain Management System - Frontend

**Version:** 1.0.0  
**Last Updated:** 2025-12-09

## Overview

Frontend web application for the Barbershop/Beauty Chain Management System (SaaS). Built with Next.js 14, React 18, and Tailwind CSS. All UI components follow the design system and brand guidelines.

## Prerequisites

- **Node.js:** 20+ (LTS recommended)
- **npm/pnpm/yarn:** Latest stable version

## Installation

```bash
# Install dependencies
npm install
# or
pnpm install
# or
yarn install
```

## Running the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm run start

# Type checking
npm run typecheck

# Linting
npm run lint
```

The application will be available at `http://localhost:3001` (or the port specified in `.env.local`).

## Environment Setup

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_APP_NAME=Barbershop Management
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── ui/          # Design system components
│   ├── layout/      # Layout components
│   └── features/    # Feature-specific components
├── lib/             # Utilities and helpers
├── hooks/           # Custom React hooks
├── store/           # State management (Zustand)
└── types/           # TypeScript types
```

## Design System Compliance

**MANDATORY:** All UI components must follow:
- **[Brand Guidelines](../../../shared/assets/brand-guidelines/README.md)** - Colors, typography, UI/UX mood & tone
- **[Design System](../../../shared/assets/ui-ux/design-system/README.md)** - Components, design tokens, patterns

**Key Requirements:**
- Use design system components from `components/ui/`
- Follow brand color palette (Deep Navy, Teal, Gold)
- Use Inter font with proper typography scale
- Apply "Confident Efficiency" mood and "Helpful Professional" tone
- Support Vietnamese language throughout
- Meet WCAG 2.1 AA accessibility standards
- Responsive design (desktop, tablet, mobile)

## Features

### Staff Interface (Cashiers & Warehouse Managers)
- Bill creation and management
- Customer management
- Inventory operations (for Warehouse Managers)
- Payment processing

### Branch Head Interface
- Branch dashboard with key metrics
- Branch reports and analytics
- Staff performance monitoring

### Customer Interface (Web)
- Service browsing and viewing
- Promotion viewing
- Loyalty points and membership tier
- Booking/appointment scheduling

## Related Documentation

- [Brand Guidelines](../../../shared/assets/brand-guidelines/README.md)
- [Design System](../../../shared/assets/ui-ux/design-system/README.md)
- [Web Application Requirements](../../../2-product-foundation/requirements/web-application/)
- [Backend API Documentation](../backend/README.md)

---

*For detailed architecture and design decisions, see the technical documentation in `3-technical/3.1-system-foundation/`.*

