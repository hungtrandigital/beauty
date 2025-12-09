# User Stories: Product Management

**Last Updated:** 2025-12-09  
**Version:** 1.0

## User Stories

### US-3.1: Manage Product Catalog

**As an** Admin  
**I want to** manage product catalog  
**So that** I can add, edit, and organize products for sale

**Acceptance Criteria:**
- [ ] Can create products with name, description, prices
- [ ] Can set customer price and staff price
- [ ] Can upload product images (multiple images)
- [ ] Can set product category/type
- [ ] Can mark product as active/inactive
- [ ] Can edit product information
- [ ] Can delete products (with confirmation)
- [ ] Can search products by name or code
- [ ] Can filter products by category, status
- [ ] Products are separated: regular products vs. dye products
- [ ] Product code is auto-generated or manual

**Business Rules:**
- Product names must be unique per tenant
- Customer price must be >= staff price
- Products must have at least one image
- Inactive products cannot be added to bills
- Deleted products are soft-deleted (archived)

**Success Criteria:**
- Product creation time: < 5 minutes
- 100% product data accuracy
- 99%+ image upload success rate

**RICE Score:** 200

---

### US-3.2: Manage Service Catalog

**As an** Admin  
**I want to** manage service catalog  
**So that** I can add, edit, and organize services

**Acceptance Criteria:**
- [ ] Can create services with name, description, price
- [ ] Can set service type (male/female/both)
- [ ] Can configure commission split (by ratio or salary level)
- [ ] Can associate products/dye with service
- [ ] Can upload service images (multiple images)
- [ ] Can set service duration
- [ ] Can mark service as active/inactive
- [ ] Can edit service information
- [ ] Can delete services (with confirmation)
- [ ] Can search services by name
- [ ] Can filter services by type, status

**Business Rules:**
- Service names must be unique per tenant
- Commission split must total 100%
- Services must have at least one image
- Inactive services cannot be added to bills
- Associated products/dye must exist

**Success Criteria:**
- Service creation time: < 5 minutes
- 100% service data accuracy
- 100% commission split accuracy

**RICE Score:** 180

---

### US-3.3: Configure Branch-Specific Pricing

**As an** Admin  
**I want to** configure branch-specific pricing  
**So that** different branches can have different prices

**Acceptance Criteria:**
- [ ] Can set default price for product/service
- [ ] Can override price for specific branch
- [ ] Can set branch-specific customer price
- [ ] Can set branch-specific staff price
- [ ] Can view all branch prices in one place
- [ ] Can copy prices from one branch to another
- [ ] Price changes are logged for audit

**Business Rules:**
- Default price applies to all branches unless overridden
- Branch-specific price overrides default
- Price changes take effect immediately
- Price history is maintained

**Success Criteria:**
- Price configuration time: < 2 minutes per product
- 100% price accuracy across branches
- Zero pricing errors in bills

**RICE Score:** 160

---

### US-3.4: Manage Product/Service Images

**As an** Admin  
**I want to** upload and manage images  
**So that** products and services have visual representation

**Acceptance Criteria:**
- [ ] Can upload images (JPG, PNG)
- [ ] Can upload multiple images per product/service
- [ ] Can set primary image
- [ ] Can reorder images
- [ ] Can delete images
- [ ] Images are automatically resized/optimized
- [ ] Image preview before upload
- [ ] Upload progress indicator
- [ ] Maximum file size: 5MB per image
- [ ] Images stored in cloud storage (S3)

**Business Rules:**
- At least one image required per product/service
- Primary image is first image by default
- Images are optimized for web (compressed)
- Images are CDN-delivered for fast loading

**Success Criteria:**
- Image upload success: 99%+
- Image load time: < 2 seconds
- Zero image loss

**RICE Score:** 140

---

## Additional User Stories

### US-3.5: Bulk Import Products

**As an** Admin  
**I want to** import products in bulk  
**So that** I can add many products quickly

**Acceptance Criteria:**
- [ ] Can upload CSV/Excel file
- [ ] Can map columns to product fields
- [ ] System validates data before import
- [ ] Can preview import results
- [ ] Can confirm or cancel import
- [ ] Import errors are shown clearly
- [ ] Import history is tracked

**RICE Score:** 120

## Related Documents

- **[Technical Specs](technical-specs.md)** - Technical requirements
- **[Success Metrics](success-metrics.md)** - Success criteria
- **[Out of Scope](out-of-scope.md)** - Excluded features

---

*All user stories designed for simplicity—critical for users with limited tech experience.*

