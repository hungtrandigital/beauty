# Card Components

**Last Updated:** 2025-12-09  
**Version:** 1.0

## Overview

Cards are containers that group related information and actions. They provide visual hierarchy and organization, making complex information easier to scan and understand.

## Basic Card

### Standard Card

**Usage:** General content grouping, product cards, information display

**Visual:**
- Background: White (#FFFFFF)
- Border: 1px solid #E5E5E5
- Border Radius: 12px
- Padding: 24px
- Shadow: Subtle (--shadow-sm)

**Structure:**
```
┌─────────────────────────────┐
│ Card Header (optional)      │
├─────────────────────────────┤
│ Card Content                │
│                             │
│                             │
├─────────────────────────────┤
│ Card Actions (optional)     │
└─────────────────────────────┘
```

**Example:**
```html
<div class="card">
  <div class="card-header">
    <h3>Tổng quan kho hàng</h3>
  </div>
  <div class="card-content">
    <p>Nội dung thẻ</p>
  </div>
  <div class="card-actions">
    <button class="btn btn-primary">Xem chi tiết</button>
  </div>
</div>
```

## Card Variants

### Elevated Card

**Usage:** Important information, featured content

**Visual:**
- Shadow: Medium (--shadow-md)
- Slightly more prominent

### Outlined Card

**Usage:** Subtle grouping, less emphasis

**Visual:**
- Border: 1px solid #E5E5E5
- No shadow
- Lighter appearance

### Interactive Card

**Usage:** Clickable cards, navigation

**Visual:**
- Hover: Shadow increases, slight scale
- Cursor: pointer
- Focus: Teal outline

**Example:**
```html
<a href="/product/123" class="card card-interactive">
  <div class="card-content">
    <h3>Sản phẩm A</h3>
    <p>Mô tả sản phẩm</p>
  </div>
</a>
```

## Business-Specific Cards

### Inventory Card

**Usage:** Display product inventory information

**Structure:**
```
┌─────────────────────────────┐
│ [Product Image]             │
│                             │
│ Tên sản phẩm                │
│ Mã: PROD-001                │
│                             │
│ Tồn kho: 50                 │
│ Giá: 100,000 ₫              │
│                             │
│ [Actions]                   │
└─────────────────────────────┘
```

### Recommendation Card

**Usage:** Smart recommendations (inventory alerts, revenue trends)

**Visual:**
- Teal accent border (left side)
- Icon indicator
- Clear action button

**Example:**
```html
<div class="card card-recommendation">
  <div class="card-icon">
    <Icon name="alert" />
  </div>
  <div class="card-content">
    <h4>Bổ sung hàng tồn kho</h4>
    <p>Sản phẩm "Dầu gội ABC" chỉ còn 5 đơn vị</p>
    <button class="btn btn-accent">Nhập hàng ngay</button>
  </div>
</div>
```

### Dashboard Widget Card

**Usage:** Dashboard metrics and KPIs

**Structure:**
```
┌─────────────────────────────┐
│ Metric Label                │
│                             │
│ 1,234,567                   │
│ ↑ 15% so với tuần trước     │
│                             │
│ [View Details]              │
└─────────────────────────────┘
```

### Bill Card

**Usage:** Display bill information

**Structure:**
```
┌─────────────────────────────┐
│ Hóa đơn #12345              │
│ Chi nhánh: Quận 1           │
│ Ngày: 09/12/2025            │
│                             │
│ Tổng tiền: 500,000 ₫        │
│ Trạng thái: Đã thanh toán   │
│                             │
│ [Actions]                   │
└─────────────────────────────┘
```

## Card Components

### Card Header

**Usage:** Title, actions, metadata

**Visual:**
- Padding: 16px 24px
- Border bottom: 1px solid #E5E5E5
- Background: #F5F5F5 (optional)

**Example:**
```html
<div class="card-header">
  <h3>Tên tiêu đề</h3>
  <button class="btn-icon">
    <Icon name="more" />
  </button>
</div>
```

### Card Content

**Usage:** Main content area

**Visual:**
- Padding: 24px
- Flexible height

### Card Actions

**Usage:** Action buttons, links

**Visual:**
- Padding: 16px 24px
- Border top: 1px solid #E5E5E5
- Right-aligned buttons

**Example:**
```html
<div class="card-actions">
  <button class="btn btn-secondary">Hủy</button>
  <button class="btn btn-primary">Lưu</button>
</div>
```

## Card Grid Layout

### Responsive Grid

**Mobile (1 column):**
```css
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
```

**Tablet (2 columns):**
```css
@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}
```

**Desktop (3-4 columns):**
```css
@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## Accessibility

### Requirements
- Semantic HTML structure
- Keyboard navigation for interactive cards
- Focus indicators
- ARIA labels for icon-only actions

### Screen Reader Support
```html
<article class="card" aria-labelledby="card-title">
  <h3 id="card-title">Tên thẻ</h3>
  <div class="card-content">
    Nội dung thẻ
  </div>
  <div class="card-actions">
    <button aria-label="Xem chi tiết sản phẩm">
      Xem chi tiết
    </button>
  </div>
</article>
```

## Usage Guidelines

### Do's
✅ Use cards to group related information  
✅ Keep card content focused and scannable  
✅ Use consistent card sizes in grids  
✅ Provide clear actions when needed  
✅ Use appropriate card variant for context

### Don'ts
❌ Don't nest cards too deeply  
❌ Don't use cards for simple text blocks  
❌ Don't make cards too wide (max 600px content)  
❌ Don't use too many cards on one screen  
❌ Don't hide important actions

## Related Components

- [Buttons](buttons.md) - Card action buttons
- [Typography](typography.md) - Card text styling
- [Icons](icons.md) - Card icons

---

*Cards organize information visually. Use them to group related content and actions.*

