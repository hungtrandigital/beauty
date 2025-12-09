# Out of Scope: Web Application for Staff, Branch Head & Customer

**Last Updated:** 2025-12-09  
**Version:** 1.0

## Overview

This document explicitly defines what is NOT included in the Web Application epic (Epic 10). These items may be considered for future epics or phases.

## Explicitly Out of Scope

### Native Mobile Apps

**Not Included:**
- Native iOS app (separate epic - Epic 8 is mobile app)
- Native Android app (separate epic - Epic 8 is mobile app)
- Mobile app features (this is web-based, responsive)

**Rationale:** This epic is for web-based interfaces. Mobile apps are covered in Epic 8.

### Admin Dashboard Features

**Not Included:**
- Admin dashboard (separate epic - Epic 9)
- System administration features
- User management UI (covered in Epic 9)
- Role/permission management UI (covered in Epic 9)

**Rationale:** Admin features are in Epic 9. This epic focuses on Staff, Branch Head, and Customer interfaces.

### Advanced Analytics

**Not Included:**
- Advanced analytics dashboard
- Custom report builder
- Data visualization beyond basic charts
- Predictive analytics
- Business intelligence features

**Rationale:** Basic reports are included. Advanced analytics is in Epic 7 (Reporting & Analytics).

### Advanced Customer Features

**Not Included:**
- Social features (sharing, reviews, ratings)
- Chat/messaging with staff
- Video consultations
- Advanced booking features (recurring appointments, group bookings)
- Payment processing in web (for customers)

**Rationale:** Focus on core customer features first. Advanced features can be added in Phase 2.

### Advanced Staff Features

**Not Included:**
- Advanced inventory forecasting
- Automated reordering
- Barcode scanning (hardware integration)
- Advanced commission calculations
- Staff scheduling/roster management

**Rationale:** Core staff features are included. Advanced features can be added later.

### Third-Party Integrations

**Not Included:**
- Payment gateway integration (beyond basic)
- Accounting software integration
- E-commerce platform integration
- Social media integration
- Email marketing integration

**Rationale:** Core system must be stable before adding integrations.

### Advanced PWA Features

**Not Included:**
- Push notifications (beyond basic)
- Background sync for complex operations
- Advanced offline capabilities
- App-like install experience customization

**Rationale:** Basic PWA features are included. Advanced features can be added in Phase 2.

### Multi-Language Support

**Not Included:**
- English language interface
- Other language support beyond Vietnamese

**Rationale:** Focus on Vietnamese market first. Multi-language can be added in Phase 2.

## Future Considerations

### Phase 2 Features
- Advanced customer features (social, chat, reviews)
- Advanced staff features (scheduling, advanced inventory)
- Payment gateway integration
- Push notifications
- Advanced PWA features

### Phase 3 Features
- Multi-language support
- Advanced analytics
- Third-party integrations
- Video consultations
- Advanced booking features

## Design Guidelines

**Note:** Even though some features are out of scope, any future features MUST follow:
- **[Brand Guidelines](../../../shared/assets/brand-guidelines/README.md)**
- **[Design System](../../../shared/assets/ui-ux/design-system/README.md)**
- **UI Mood:** "Confident Efficiency"
- **UI Tone:** "Helpful Professional"
- **Accessibility:** WCAG 2.1 AA minimum
- **Language:** Vietnamese

## Related Documents

- **[User Stories](user-stories.md)** - What IS included
- **[Product Backlog](../../2.2-product-backlog/backlog.md)** - Future epics
- **[Design Guidelines](../../../shared/assets/brand-guidelines/README.md)** - Design requirements
- **[Mobile App Requirements](../mobile-app/)** - Epic 8 (complementary mobile app)
- **[Admin Dashboard Requirements](../admin-dashboard/)** - Epic 9 (admin features)

---

*This document helps prevent scope creep and sets clear expectations for MVP. All future features must follow design guidelines. This is web-based (responsive), not native mobile apps.*

