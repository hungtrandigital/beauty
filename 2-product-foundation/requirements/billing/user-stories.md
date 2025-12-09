# User Stories: Billing

**Last Updated:** 2025-12-09  
**Version:** 1.0

## User Stories

### US-2.1: Create Bills for Customers

**As a** Cashier  
**I want to** create bills for customers  
**So that** I can process sales

**Acceptance Criteria:**
- [ ] Can add products to bill
- [ ] Can add services to bill
- [ ] Can apply promotions automatically
- [ ] Can apply manual discounts
- [ ] Can calculate total with discounts
- [ ] Can see itemized breakdown
- [ ] Can save bill as draft
- [ ] Can edit bill before payment
- [ ] Can remove items from bill
- [ ] Bill shows customer information (if customer selected)
- [ ] Bill shows branch information
- [ ] Bill shows date and time

**Business Rules:**
- Products must have available inventory
- Services must be active
- Promotions apply automatically if eligible
- Draft bills expire after 24 hours
- Bills must have at least one item

**Success Criteria:**
- Bill creation time: < 2 minutes
- 95%+ bills created without errors
- 100% promotion application accuracy

**RICE Score:** 220

---

### US-2.2: Create Bills Offline

**As a** Cashier  
**I want to** create bills offline  
**So that** I can continue working when network is down

**Acceptance Criteria:**
- [ ] Bills can be created without internet connection
- [ ] Bills are saved locally (IndexedDB/PouchDB)
- [ ] Bills automatically sync when connection is restored
- [ ] Sync status is visible (synced, pending, error)
- [ ] Can view pending bills waiting to sync
- [ ] Conflict resolution for sync issues
- [ ] No data loss during offline operations
- [ ] Can process payments offline
- [ ] Payment syncs when online

**Business Rules:**
- Offline bills use local inventory (cached)
- Inventory validation happens on sync
- Conflicts resolved with "last write wins" or manual resolution
- Offline bills marked with "offline" indicator

**Success Criteria:**
- 100% offline bill creation success rate
- 100% sync success rate (no data loss)
- Sync completes within 5 minutes of connection restore

**RICE Score:** 200

---

### US-2.3: Process Payments

**As a** Cashier  
**I want to** process payments  
**So that** customers can pay for bills

**Acceptance Criteria:**
- [ ] Can record cash payments
- [ ] Can record card payments
- [ ] Can record multiple payment methods for one bill
- [ ] Payment amount can be entered
- [ ] System calculates change (for cash)
- [ ] Payment status is updated (paid, partial, unpaid)
- [ ] Payment receipt can be printed
- [ ] Payment history is tracked
- [ ] Can process payments offline

**Business Rules:**
- Payment amount cannot exceed bill total
- Change calculated automatically for cash payments
- Multiple payment methods allowed (e.g., cash + card)
- Payment must match bill total (or be marked as partial)

**Success Criteria:**
- Payment processing time: < 30 seconds
- 100% payment accuracy
- Zero payment data loss

**RICE Score:** 180

---

### US-2.4: Apply Promotions to Bills

**As a** System  
**I want to** automatically apply eligible promotions  
**So that** customers get discounts and cashiers don't need to manually apply

**Acceptance Criteria:**
- [ ] System automatically finds eligible promotions
- [ ] Promotions are applied based on rules
- [ ] Discount is calculated and shown clearly
- [ ] Promotion usage is tracked
- [ ] Cashier can see which promotions were applied
- [ ] Cashier can remove promotions (if allowed)
- [ ] Multiple promotions can apply (if rules allow)
- [ ] Promotion rules are validated before application

**Business Rules:**
- Promotions apply automatically when eligible
- Promotion rules checked in order (priority)
- Some promotions may be mutually exclusive
- Promotion usage limits enforced

**Success Criteria:**
- 100% eligible promotions applied automatically
- Zero incorrect promotion applications
- Promotion tracking accuracy: 100%

**RICE Score:** 160

---

## Additional User Stories

### US-2.5: View Bill History

**As a** Cashier or Admin  
**I want to** view bill history  
**So that** I can look up past transactions

**Acceptance Criteria:**
- [ ] Can search bills by bill number
- [ ] Can search bills by customer
- [ ] Can filter by date range
- [ ] Can filter by branch
- [ ] Can view bill details
- [ ] Can reprint receipt

**RICE Score:** 140

### US-2.6: QR Code Customer Identification

**As a** Cashier  
**I want to** scan customer QR code  
**So that** I can quickly identify customers and apply loyalty benefits

**Acceptance Criteria:**
- [ ] Can scan QR code with camera
- [ ] Customer information loads automatically
- [ ] Loyalty points and tier shown
- [ ] Eligible promotions for customer shown
- [ ] Can create bill for customer quickly

**RICE Score:** 150

## Related Documents

- **[Technical Specs](technical-specs.md)** - Technical requirements
- **[Success Metrics](success-metrics.md)** - Success criteria
- **[Out of Scope](out-of-scope.md)** - Excluded features

---

*All user stories designed for simplicity and speed—critical for cashier workflow.*

