# Out of Scope: Admin Dashboard & System Management

**Last Updated:** 2025-12-09  
**Version:** 1.0

## Overview

This document explicitly defines what is NOT included in the Admin Dashboard & System Management epic (Epic 9). These items may be considered for future epics or phases.

## Explicitly Out of Scope

### Advanced Security Features

**Not Included:**
- Two-factor authentication (2FA) - Phase 2
- Single sign-on (SSO) - Phase 2
- Advanced password policies (complexity requirements beyond basic)
- IP whitelisting/blacklisting
- Session management UI (beyond basic timeout)
- Security audit reports (beyond basic logs)

**Rationale:** Focus on core admin functionality first. Advanced security features can be added in Phase 2.

### Advanced Analytics & Reporting

**Not Included:**
- Custom report builder
- Advanced analytics dashboard
- Data visualization beyond basic metrics
- Export to advanced formats (Excel, PDF with charts)
- Scheduled reports
- Report templates

**Rationale:** Basic dashboard metrics are included. Advanced reporting is in Epic 7 (Reporting & Analytics).

### Third-Party Integrations Management

**Not Included:**
- Integration management UI
- API key management UI
- Webhook configuration UI
- Third-party service configuration (payment gateways, accounting software)
- Integration health monitoring

**Rationale:** Core admin functionality first. Integration management can be added in future phase.

### Advanced User Features

**Not Included:**
- User groups/teams management
- Bulk user operations (import/export)
- User activity analytics
- User behavior tracking
- User performance metrics

**Rationale:** Basic user management is included. Advanced features can be added later.

### Advanced System Configuration

**Not Included:**
- Custom workflow configuration
- Business rule engine configuration
- Advanced notification templates (beyond basic)
- Multi-language system configuration (beyond Vietnamese)
- Custom field configuration

**Rationale:** Focus on essential system configuration. Advanced customization can be added in Phase 2.

### Mobile Admin App

**Not Included:**
- Mobile app for admins
- Mobile-responsive admin features (beyond basic)
- Push notifications for admins

**Rationale:** Web-based admin dashboard is sufficient for MVP. Mobile admin app can be added in Phase 2.

### Advanced Monitoring

**Not Included:**
- Real-time system monitoring dashboard
- Performance metrics visualization
- Alert configuration UI
- System health dashboards beyond basic
- Infrastructure monitoring

**Rationale:** Basic activity logs and metrics are included. Advanced monitoring can be added in Phase 2.

## Future Considerations

### Phase 2 Features
- Two-factor authentication (2FA)
- Single sign-on (SSO)
- Advanced security features
- Custom report builder
- Integration management UI

### Phase 3 Features
- Advanced analytics dashboard
- Mobile admin app
- Advanced monitoring
- User behavior analytics
- Custom workflow configuration

## Design Guidelines

**Note:** Even though some features are out of scope, any future features MUST follow:
- **[Brand Guidelines](../../../shared/assets/brand-guidelines/README.md)**
- **[Design System](../../../shared/assets/ui-ux/design-system/README.md)**
- **UI Mood:** "Confident Efficiency"
- **UI Tone:** "Helpful Professional"
- **Accessibility:** WCAG 2.1 AA minimum

## Related Documents

- **[User Stories](user-stories.md)** - What IS included
- **[Product Backlog](../../2.2-product-backlog/backlog.md)** - Future epics
- **[Design Guidelines](../../../shared/assets/brand-guidelines/README.md)** - Design requirements

---

*This document helps prevent scope creep and sets clear expectations for MVP. All future features must follow design guidelines.*


