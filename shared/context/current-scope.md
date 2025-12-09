# Current Project Scope

**Last Updated:** 2025-01-09  
**Status:** Finalized

## Project/Feature Overview

**Name:** Barbershop/Beauty Chain Management System (SaaS)  
**Type:** External Product (SaaS for barbershops and beauty chains)  
**Target Audience:** Barbershops and beauty chains (multi-location businesses)

## Scope & Context

### Primary Goals
- Build a comprehensive barbershop/beauty chain management system based on Vu Tri Barbershop's proven software (used for 3 years across 18 locations in HCMC)
- Create a SaaS product to sell to other barbershops and beauty chains
- Replicate and improve upon the successful features from Vu Tri's custom software

### Key Requirements

#### Core Modules Identified from HDSD.pdf:

**1. Product Management (2.1)**
- Product catalog management (products for sale vs. dye products for services)
- Product information: name, customer price, staff price, images, commission split details
- Separate inventory for regular products and dye products

**2. Warehouse Management (2.1.3-2.1.11)**
- Central warehouse with branch distribution
- Product import to central warehouse (with approval workflow)
- Dye import to central warehouse (with approval workflow)
- Export products to branches (with approval + branch confirmation)
- Export dye to branches (with approval + branch confirmation)
- Return products to central warehouse from branches
- Return dye to central warehouse from branches
- Inventory adjustment (add/remove products)
- Inventory adjustment (add/remove dye)
- Warehouse inventory tracking and history

**3. Promotion Management (2.2)**
- 10 types of promotion programs:
  - Invoice discount
  - Invoice gift
  - Invoice product discount
  - Invoice voucher gift
  - Purchase discount
  - Purchase gift
  - Purchase voucher gift
  - Discount by invoice amount
  - Gift by invoice amount
  - Product discount by invoice amount
- Voucher management (create, import codes, usage limits)
- Point exchange programs (exchange points for free services)

**4. Reports (2.3)**
- Product reports (sales to customers, sales to staff, revenue, commission)
- Service reports (service count, revenue)
- Employee reports (services performed, revenue, cash/commission paid, profit, branch)

**5. Customer App Features (2.4)**
- Banner management (multiple banner types: welcome, homepage, service experience, commitment, logo, account page, points page)
- News management (discover, lookbook articles)
- Service group management
- Membership package management (prepaid packages)
- Customer bill reviews/ratings

**6. System Administration (2.5)**
- Branch management (code, name, hotline, parking, Google Maps address, branch-specific pricing)
- Service management (price, commission split by ratio or salary level, service type: male/female, images, associated products/dye)
- Membership tier management (automatic tier assignment based on points)
- Customer management (CRUD operations)
- Bill management (create, update, payment, QR code scanning)
- Offline bill management (for when network is down, auto-sync when back online)
- Appointment/booking management (view schedules, employee availability)
- Order management (staff purchase orders, approval workflow)
- Expense voucher management (branch expenses, admin approval)
- System configuration (booking settings, points conversion rate, etc.)

### User Roles
- **Admin** - Full system access
- **Cashier (Thu ngân)** - Bill management, payments, approvals
- **Warehouse Manager (Thủ kho)** - Inventory management, approvals

### Technical Requirements
- Multi-location support (central warehouse + branches)
- Approval workflows for inventory operations
- Offline mode support (bills can be created offline, sync when online)
- Mobile app for customers
- QR code scanning for customer identification
- Commission/salary split calculations
- Point/loyalty system
- Multiple promotion types with complex rules
- Reporting and analytics

### Constraints & Limitations
- Based on existing proven system (Vu Tri Barbershop - 18 locations, 3 years of use)
- Must support Vietnamese market (language, currency, business practices)
- Must handle multi-location inventory management
- Must support offline operations (network issues)

### Clarified Details
- **Source Material:** HDSD.pdf (User Manual) - 41 pages, comprehensive feature documentation
- **Reference System:** Vu Tri Barbershop management software
- **Business Model:** SaaS subscription (to be confirmed)
- **Target Market:** Barbershops and beauty chains in Vietnam (potentially expandable)
- **Competitive Advantage:** Based on proven system used by successful chain (18 locations)

### Tech Stack Preferences (Optional)
- To be determined by System Architecture agent
- Should support:
  - Web application (admin/cashier/warehouse manager)
  - Mobile app (customer-facing)
  - Offline capability
  - Real-time sync
  - Multi-tenant architecture (for SaaS)

## Notes

- The system is comprehensive and includes features for inventory, promotions, customer loyalty, appointments, and multi-location management
- Key differentiator: Proven track record (3 years, 18 locations)
- Focus areas: Multi-location inventory management, complex promotion system, customer app integration
- Next steps: Market research, competitive analysis, technical architecture planning

---

**Note:** This file is maintained by Chat Mode when scope is finalized. Other modes should read this before starting work and can suggest updates if scope issues are discovered.
