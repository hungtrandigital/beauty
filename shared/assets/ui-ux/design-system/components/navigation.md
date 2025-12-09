# Navigation Components

**Last Updated:** 2025-12-09  
**Version:** 1.0

## Overview

Navigation provides structure and orientation in the application. It must be clear, consistent, and reflect business logic rather than technical structure. Critical for users with limited tech experience.

## Main Navigation

### Sidebar Navigation (Desktop)

**Usage:** Primary navigation for admin dashboard

**Structure:**
```
┌─────────────────┐
│ Logo            │
├─────────────────┤
│ 📦 Kho hàng     │
│   ├─ Kho trung  │
│   └─ Chi nhánh  │
│ 💰 Bán hàng     │
│ 📊 Báo cáo      │
│ ⚙️ Cài đặt      │
└─────────────────┘
```

**Visual:**
- Background: Deep Navy (#1A2B4A)
- Width: 240px (collapsed: 64px)
- Text: White
- Active: Teal background (#00A8A8)
- Hover: Lighter navy

**Example:**
```html
<nav class="sidebar">
  <div class="sidebar-header">
    <Logo />
  </div>
  <ul class="sidebar-menu">
    <li class="menu-item active">
      <Icon name="warehouse" />
      <span>Kho hàng</span>
    </li>
    <li class="menu-item">
      <Icon name="sales" />
      <span>Bán hàng</span>
    </li>
  </ul>
</nav>
```

### Top Navigation (Mobile)

**Usage:** Mobile navigation, compact spaces

**Structure:**
```
┌─────────────────────────────┐
│ [Menu] Logo        [User]   │
└─────────────────────────────┘
```

**Visual:**
- Background: White
- Height: 64px
- Border bottom: 1px solid #E5E5E5
- Hamburger menu icon

## Navigation Items

### Menu Item States

**Default:**
- Text: White (sidebar) / Deep Navy (top nav)
- Background: Transparent
- Icon + Text

**Active:**
- Background: Teal (#00A8A8)
- Text: White
- Left border indicator (optional)

**Hover:**
- Background: Lighter shade
- Smooth transition

**Example:**
```html
<li class="menu-item active">
  <a href="/inventory">
    <Icon name="warehouse" />
    <span>Kho hàng</span>
  </a>
</li>
```

### Nested Menu Items

**Usage:** Sub-sections, hierarchical navigation

**Visual:**
- Indented (16px)
- Smaller font size
- Chevron icon (expandable)

**Example:**
```html
<li class="menu-item has-children">
  <a href="/inventory">
    <Icon name="warehouse" />
    <span>Kho hàng</span>
    <Icon name="chevron-down" />
  </a>
  <ul class="submenu">
    <li><a href="/inventory/central">Kho trung tâm</a></li>
    <li><a href="/inventory/branches">Chi nhánh</a></li>
  </ul>
</li>
```

## Breadcrumbs

**Usage:** Show current location, enable navigation

**Visual:**
- Text: Secondary text color (#4A4A4A)
- Separator: "/" or ">"
- Last item: Primary text color, bold
- Links: Teal, hover underline

**Example:**
```html
<nav class="breadcrumbs">
  <a href="/">Trang chủ</a>
  <span class="separator">/</span>
  <a href="/products">Sản phẩm</a>
  <span class="separator">/</span>
  <span class="current">Danh sách sản phẩm</span>
</nav>
```

**Vietnamese Format:**
- Home → Products → Product List
- "Trang chủ > Sản phẩm > Danh sách"

## Tabs

**Usage:** Switch between related views

**Visual:**
- Border bottom: 2px solid (active)
- Active: Teal (#00A8A8)
- Inactive: Gray (#8A8A8A)
- Padding: 12px 24px

**Example:**
```html
<div class="tabs">
  <button class="tab active">Tất cả</button>
  <button class="tab">Đang hoạt động</button>
  <button class="tab">Đã tạm dừng</button>
</div>
```

## Pagination

**Usage:** Navigate through pages of data

**Visual:**
- Previous/Next buttons
- Page numbers
- Current page: Teal background
- Disabled: Gray, not clickable

**Example:**
```html
<nav class="pagination">
  <button class="btn-icon" disabled>
    <Icon name="chevron-left" />
  </button>
  <button class="page-number active">1</button>
  <button class="page-number">2</button>
  <button class="page-number">3</button>
  <button class="btn-icon">
    <Icon name="chevron-right" />
  </button>
</nav>
```

## Mobile Navigation

### Bottom Navigation (Mobile App)

**Usage:** Primary navigation in mobile app

**Structure:**
```
┌─────────────────────────────┐
│                             │
│        Content Area         │
│                             │
├─────────────────────────────┤
│ [Home] [Sales] [Reports]    │
└─────────────────────────────┘
```

**Visual:**
- Fixed bottom
- Height: 64px
- Icons + Labels
- Active: Teal icon and text

### Drawer Navigation (Mobile Web)

**Usage:** Collapsible sidebar on mobile

**Visual:**
- Slides in from left
- Overlay background
- Full height
- Close button (X)

## Navigation Labels

### Vietnamese Business Terms

**Use:**
- ✅ "Kho hàng" (Warehouse)
- ✅ "Bán hàng" (Sales)
- ✅ "Chi nhánh" (Branch)
- ✅ "Báo cáo" (Reports)
- ✅ "Cài đặt" (Settings)

**Avoid:**
- ❌ Technical terms ("API", "Endpoints")
- ❌ English terms ("Dashboard", "Admin")
- ❌ Vague terms ("Stuff", "Things")

## Accessibility

### Requirements
- Keyboard navigation (Tab, Arrow keys)
- Focus indicators (2px teal outline)
- ARIA labels for icon-only items
- Skip navigation link
- Current page indicator

### Screen Reader Support
```html
<nav aria-label="Main navigation">
  <ul>
    <li>
      <a href="/inventory" aria-current="page">
        <Icon aria-hidden="true" name="warehouse" />
        <span>Kho hàng</span>
      </a>
    </li>
  </ul>
</nav>
```

## Usage Guidelines

### Do's
✅ Use clear, business-oriented labels  
✅ Group related items together  
✅ Show current location clearly  
✅ Use icons + text (not icons alone)  
✅ Keep navigation consistent

### Don'ts
❌ Don't use technical terminology  
❌ Don't hide navigation  
❌ Don't use too many levels (max 3)  
❌ Don't change navigation structure frequently  
❌ Don't use vague labels

## Related Components

- [Icons](icons.md) - Navigation icons
- [Buttons](buttons.md) - Navigation buttons
- [Typography](typography.md) - Navigation text

---

*Navigation guides users through the system. Make it clear, consistent, and business-oriented.*

