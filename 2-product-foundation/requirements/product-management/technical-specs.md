# Technical Specifications: Product Management

**Last Updated:** 2025-12-09  
**Version:** 1.0

## Overview

Technical requirements and specifications for the Product Management epic. This document defines APIs, database schema, file storage, and performance requirements.

## API Endpoints

### Products

**POST /api/products**
- Create new product
- Request body: `{ name, description, customerPrice, staffPrice, type, images: [...] }`
- Response: `{ id, name, code, createdAt }`

**GET /api/products**
- List products (with filters)
- Query params: `type?`, `status?`, `search?`, `page?`, `limit?`
- Response: `{ products: [...], total, page }`

**GET /api/products/:id**
- Get product details
- Response: `{ id, name, code, prices, images, inventory, ... }`

**PUT /api/products/:id**
- Update product
- Request body: `{ name?, description?, prices?, images?, ... }`
- Response: `{ id, updated }`

**DELETE /api/products/:id**
- Delete product (soft delete)
- Response: `{ success }`

### Services

**POST /api/services**
- Create new service
- Request body: `{ name, description, price, type, commissionSplit, associatedProducts: [...], images: [...] }`
- Response: `{ id, name, createdAt }`

**GET /api/services**
- List services (with filters)
- Query params: `type?`, `status?`, `search?`
- Response: `{ services: [...], total }`

**GET /api/services/:id**
- Get service details
- Response: `{ id, name, price, commissionSplit, associatedProducts, images, ... }`

**PUT /api/services/:id**
- Update service
- Response: `{ id, updated }`

### Pricing

**PUT /api/products/:id/pricing**
- Update product pricing
- Request body: `{ defaultPrice?, branchPrices?: [{ branchId, customerPrice, staffPrice }] }`
- Response: `{ success }`

**GET /api/products/:id/pricing**
- Get product pricing across branches
- Response: `{ defaultPrice, branchPrices: [...] }`

### Images

**POST /api/products/:id/images**
- Upload product image
- Request: Multipart form data
- Response: `{ id, url, thumbnailUrl }`

**DELETE /api/products/:id/images/:imageId**
- Delete product image
- Response: `{ success }`

**PUT /api/products/:id/images/reorder**
- Reorder images
- Request body: `{ imageIds: [...] }`
- Response: `{ success }`

## Database Schema

### Product Entity

```typescript
{
  id: string;
  tenantId: string;
  code: string;
  name: string;
  description?: string;
  type: 'product' | 'dye';
  customerPrice: number;
  staffPrice: number;
  images: Array<{ id, url, thumbnailUrl, order }>;
  branchPrices?: Array<{
    branchId: string;
    customerPrice: number;
    staffPrice: number;
  }>;
  status: 'active' | 'inactive';
  category?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date; // Soft delete
}
```

### Service Entity

```typescript
{
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  price: number;
  type: 'male' | 'female' | 'both';
  duration?: number; // minutes
  commissionSplit: {
    type: 'ratio' | 'salary_level';
    splits: Array<{ level, ratio }>;
  };
  associatedProducts: Array<{ productId, quantity }>;
  associatedDye: Array<{ productId, quantity }>;
  images: Array<{ id, url, thumbnailUrl, order }>;
  branchPrices?: Array<{
    branchId: string;
    price: number;
  }>;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
```

## File Storage

### Image Storage

**Storage:** AWS S3
- **Bucket:** Product images bucket
- **Path Structure:** `{tenantId}/products/{productId}/{imageId}.jpg`
- **CDN:** CloudFront for delivery

**Image Processing:**
- **Resize:** Automatic resize to multiple sizes
- **Optimization:** JPEG compression, WebP conversion
- **Thumbnails:** 150×150px, 300×300px, 600×600px
- **Max Size:** 5MB per image

**Image Formats:**
- **Accepted:** JPG, PNG
- **Output:** JPG (optimized), WebP (for modern browsers)

## Performance Requirements

### Response Times
- **Product List API:** < 500ms
- **Product Details API:** < 300ms
- **Image Upload:** < 10 seconds (5MB image)
- **Search API:** < 500ms

### Scalability
- **Products per Tenant:** 10,000+ products
- **Services per Tenant:** 1,000+ services
- **Concurrent Uploads:** 10+ simultaneous uploads

### Data Consistency
- **ACID Compliance:** All product operations atomic
- **Image Consistency:** Images uploaded before product save
- **Pricing Consistency:** Branch prices validated before save

## Security Requirements

### Access Control
- **Role-Based:** Admin role only
- **Tenant Isolation:** Row-level security (RLS)
- **Audit Logging:** All product operations logged

### File Security
- **Upload Validation:** File type, size validation
- **Virus Scanning:** Scan uploaded images (optional)
- **Access Control:** Signed URLs for image access

## Integration Requirements

### Inventory Management
- **Dependency:** Inventory system
- **Integration:** Product creation triggers inventory setup
- **API:** Inventory creation endpoint

### Billing System
- **Dependency:** Billing system
- **Integration:** Products/services available in bill creation
- **API:** Product/service lookup endpoints

## Related Documents

- **[Domain Specs](../../../3-technical/3.1-system-foundation/architecture/domain-specs.md)** - Domain model
- **[API Contracts](../../../3-technical/3.1-system-foundation/architecture/api-contracts/openapi.yaml)** - API specifications
- **[User Stories](user-stories.md)** - Feature requirements

---

*Technical specifications align with system architecture and file storage strategy.*

