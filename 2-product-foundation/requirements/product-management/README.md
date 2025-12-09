# Product Requirements: Product Management

**Last Updated:** 2025-12-09  
**Version:** 1.0  
**Epic:** Epic 3 - Product & Service Management

## Overview

This PRD defines requirements for product and service catalog management. This includes products for sale, dye products for services, services with commission splits, and branch-specific pricing.

## Business Context

Chain owners need to manage their product and service catalogs efficiently. The system must support:
- Separate catalogs for products (for sale) and dye products (for services)
- Services with commission splits and associated products/dye
- Branch-specific pricing
- Image management
- Commission configuration

## User Stories

See [user-stories.md](user-stories.md) for detailed user stories with acceptance criteria.

**Key User Stories:**
- US-3.1: Manage product catalog
- US-3.2: Manage service catalog
- US-3.3: Configure branch-specific pricing
- US-3.4: Manage product/service images

## Success Metrics

See [success-metrics.md](success-metrics.md) for detailed metrics.

**Key Metrics:**
- Product creation time: < 5 minutes
- Service creation time: < 5 minutes
- Catalog accuracy: 100%
- Image upload success: 99%+

## Technical Requirements

See [technical-specs.md](technical-specs.md) for detailed technical specifications.

**Key Requirements:**
- Product and service CRUD operations
- Image upload and storage (AWS S3)
- Branch-specific pricing configuration
- Commission split calculations
- Vietnamese language support

## Design Requirements

**UI/UX:**
- Simple product/service forms
- Image upload with preview
- Clear pricing configuration
- Vietnamese language throughout
- Mobile-responsive

**User Flows:**
- Product creation flow
- Service creation flow
- Pricing configuration flow
- Image management flow

## Out of Scope

See [out-of-scope.md](out-of-scope.md) for items explicitly out of scope.

**Not Included:**
- Product variants (sizes, colors) - Phase 2
- Advanced product attributes - Phase 2
- Product bundling - Phase 2
- Supplier management - Future

## Related Documents

- **[Product Backlog](../../2.2-product-backlog/backlog.md)** - Epic 3 user stories
- **[Domain Specs](../../../3-technical/3.1-system-foundation/architecture/domain-specs.md)** - Technical domain model
- **[Implementation Plan](../../../3-technical/3.2-implementation/plans/plan.md)** - Sprint 2

---

*This PRD provides detailed requirements for product management. See individual files for complete specifications.*

