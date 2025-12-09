# Recommendation Cards

**Last Updated:** 2025-12-09  
**Version:** 1.0

## Overview

Recommendation cards display proactive insights and alerts based on system logic. They help chain owners make decisions without analyzing data manually. Designed for simplicity and clarity—critical for users with limited tech experience.

## Design Principles

1. **Simple Language** - No jargon, clear Vietnamese
2. **Visual Indicators** - Icons, colors, arrows
3. **Actionable** - Direct action buttons
4. **Context-Aware** - Based on actual business data
5. **Scannable** - Quick to understand at a glance

## Card Types

### Inventory Alert Card

**Usage:** Low stock alerts, refill recommendations

**Visual:**
- Left border: Warning Orange (#F59E0B) or Error Red (#EF4444)
- Icon: Alert or Warning icon
- Background: Warning light (#FEF3C7) or Error light (#FEE2E2)

**Structure:**
```
┌─────────────────────────────────┐
│ ⚠️ Bổ sung hàng tồn kho         │
│                                 │
│ Sản phẩm "Dầu gội ABC"         │
│ chỉ còn 5 đơn vị                │
│                                 │
│ [Nhập hàng ngay]                │
└─────────────────────────────────┘
```

**Example:**
```html
<div class="card card-recommendation card-warning">
  <div class="card-icon">
    <Icon name="alert" />
  </div>
  <div class="card-content">
    <h4>Bổ sung hàng tồn kho</h4>
    <p>Sản phẩm <strong>"Dầu gội ABC"</strong> chỉ còn <strong>5 đơn vị</strong></p>
    <p class="card-meta">Kho trung tâm: 20 đơn vị</p>
    <button class="btn btn-accent">Nhập hàng ngay</button>
  </div>
</div>
```

### Revenue Trend Card

**Usage:** Revenue growth/decline indicators

**Visual:**
- Success: Green border (#10B981), up arrow ↑
- Warning: Orange border (#F59E0B), down arrow ↓
- Icon: Trending up/down

**Structure:**
```
┌─────────────────────────────────┐
│ 📈 Doanh thu tuần này           │
│                                 │
│ 15,000,000 ₫                    │
│ ↑ 15% so với tuần trước         │
│                                 │
│ [Xem chi tiết]                  │
└─────────────────────────────────┘
```

**Example:**
```html
<div class="card card-recommendation card-success">
  <div class="card-icon">
    <Icon name="trending-up" />
  </div>
  <div class="card-content">
    <h4>Doanh thu tuần này</h4>
    <div class="metric-value">15,000,000 ₫</div>
    <p class="metric-change positive">
      <Icon name="arrow-up" />
      <span>15% so với tuần trước</span>
    </p>
    <button class="btn btn-ghost">Xem chi tiết</button>
  </div>
</div>
```

**Decline Example:**
```html
<div class="card card-recommendation card-warning">
  <div class="card-icon">
    <Icon name="trending-down" />
  </div>
  <div class="card-content">
    <h4>Doanh thu tuần này</h4>
    <div class="metric-value">12,000,000 ₫</div>
    <p class="metric-change negative">
      <Icon name="arrow-down" />
      <span>10% so với tuần trước</span>
    </p>
    <p class="card-suggestion">Kiểm tra sản phẩm "Dịch vụ A" - doanh thu giảm 20%</p>
    <button class="btn btn-ghost">Xem chi tiết</button>
  </div>
</div>
```

### Top Performer Card

**Usage:** Top selling products/services

**Visual:**
- Teal accent border
- Gold star icon (optional)
- Success green background tint

**Structure:**
```
┌─────────────────────────────────┐
│ ⭐ Sản phẩm bán chạy nhất       │
│                                 │
│ Dầu gội ABC                     │
│ 150 đơn vị - 15,000,000 ₫       │
│ (Tháng này)                     │
│                                 │
│ [Xem báo cáo]                   │
└─────────────────────────────────┘
```

**Example:**
```html
<div class="card card-recommendation card-highlight">
  <div class="card-icon">
    <Icon name="star" />
  </div>
  <div class="card-content">
    <h4>Sản phẩm bán chạy nhất</h4>
    <div class="top-item">
      <strong>Dầu gội ABC</strong>
      <div class="item-stats">
        <span>150 đơn vị</span>
        <span>•</span>
        <span>15,000,000 ₫</span>
      </div>
      <p class="card-meta">Tháng này</p>
    </div>
    <button class="btn btn-ghost">Xem báo cáo</button>
  </div>
</div>
```

### Revenue Source Breakdown Card

**Usage:** Revenue breakdown by products/services

**Visual:**
- Simple pie chart or bar chart
- Clear percentages
- Color-coded segments

**Structure:**
```
┌─────────────────────────────────┐
│ 📊 Nguồn doanh thu              │
│                                 │
│ [Pie Chart]                     │
│                                 │
│ Sản phẩm: 60%                   │
│ Dịch vụ: 40%                    │
│                                 │
│ [Xem chi tiết]                  │
└─────────────────────────────────┘
```

**Example:**
```html
<div class="card card-recommendation">
  <div class="card-icon">
    <Icon name="chart" />
  </div>
  <div class="card-content">
    <h4>Nguồn doanh thu</h4>
    <div class="revenue-breakdown">
      <div class="breakdown-item">
        <div class="breakdown-bar" style="width: 60%"></div>
        <span>Sản phẩm: 60%</span>
      </div>
      <div class="breakdown-item">
        <div class="breakdown-bar" style="width: 40%"></div>
        <span>Dịch vụ: 40%</span>
      </div>
    </div>
    <button class="btn btn-ghost">Xem chi tiết</button>
  </div>
</div>
```

## Card Layout

### Dashboard Grid

**Layout:**
- 1 column (mobile)
- 2 columns (tablet)
- 3 columns (desktop)

**Priority:**
- High priority: Full width or prominent position
- Medium priority: Standard grid position
- Low priority: Smaller card, less prominent

### Card Stacking

**Order:**
1. Critical alerts (inventory low)
2. Revenue trends (important metrics)
3. Top performers (insights)
4. Breakdowns (detailed analysis)

## Visual Indicators

### Icons

**Inventory:**
- ⚠️ Alert icon (warning)
- 📦 Package icon (inventory)

**Revenue:**
- 📈 Trending up (growth)
- 📉 Trending down (decline)
- 💰 Money icon (revenue)

**Performance:**
- ⭐ Star (top performer)
- 🏆 Trophy (achievement)

### Colors

**Success (Green):**
- Revenue growth
- Positive trends
- Achievements

**Warning (Orange):**
- Revenue decline
- Attention needed
- Moderate alerts

**Error (Red):**
- Critical inventory
- Urgent actions
- Important alerts

**Info (Teal):**
- General information
- Neutral insights

## Action Buttons

### Primary Actions

**Examples:**
- "Nhập hàng ngay" (Import Now)
- "Xem chi tiết" (View Details)
- "Tạo yêu cầu" (Create Request)

**Visual:**
- Accent button (Teal)
- Clear, action-oriented label
- Direct link to relevant action

### Secondary Actions

**Examples:**
- "Xem báo cáo" (View Report)
- "Xem tất cả" (View All)
- "Bỏ qua" (Dismiss)

**Visual:**
- Ghost button
- Less prominent

## Accessibility

### Requirements
- Clear heading structure
- Descriptive button labels
- Color not the only indicator (use icons/text)
- Keyboard navigation
- Screen reader announcements

### Screen Reader Support
```html
<div class="card card-recommendation" role="alert">
  <div class="card-icon" aria-hidden="true">
    <Icon name="alert" />
  </div>
  <div class="card-content">
    <h4>Bổ sung hàng tồn kho</h4>
    <p>Sản phẩm "Dầu gội ABC" chỉ còn 5 đơn vị</p>
    <button aria-label="Nhập hàng cho sản phẩm Dầu gội ABC">
      Nhập hàng ngay
    </button>
  </div>
</div>
```

## Usage Guidelines

### Do's
✅ Use simple, clear Vietnamese language  
✅ Show actual data (not generic messages)  
✅ Provide direct actions  
✅ Use visual indicators (icons, colors)  
✅ Make recommendations scannable

### Don'ts
❌ Don't use technical jargon  
❌ Don't show too many recommendations at once  
❌ Don't use vague messages  
❌ Don't hide actions  
❌ Don't overwhelm with data

## Related Components

- [Cards](cards.md) - Base card component
- [Buttons](buttons.md) - Action buttons
- [Icons](icons.md) - Recommendation icons

---

*Recommendation cards help users make decisions. Make them simple, clear, and actionable.*

