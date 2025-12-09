# Button Components

**Last Updated:** 2025-12-09  
**Version:** 1.0

## Overview

Buttons are primary interactive elements that guide users through actions. Our button system is designed for clarity, accessibility, and simplicity—critical for users with limited tech experience.

## Button Variants

### Primary Button

**Usage:** Main actions, CTAs, important operations

**Visual:**
- Background: Deep Navy (#1A2B4A)
- Text: White
- Size: Medium (default)
- Border Radius: 8px
- Padding: 12px 24px

**States:**
- Default: Deep Navy background
- Hover: Darker navy (#152238)
- Active: Darkest navy (#0F1A2A)
- Disabled: Gray background (#E5E5E5), gray text (#8A8A8A)

**Example:**
```html
<button class="btn btn-primary">
  Xuất hàng
</button>
```

### Secondary Button

**Usage:** Secondary actions, alternative options

**Visual:**
- Background: Transparent
- Border: 1px solid Deep Navy (#1A2B4A)
- Text: Deep Navy
- Hover: Light gray background (#F5F5F5)

**Example:**
```html
<button class="btn btn-secondary">
  Hủy
</button>
```

### Accent Button

**Usage:** Positive actions, confirmations, success states

**Visual:**
- Background: Teal (#00A8A8)
- Text: White
- Hover: Darker teal (#008A8A)

**Example:**
```html
<button class="btn btn-accent">
  Xác nhận
</button>
```

### Ghost Button

**Usage:** Tertiary actions, less important operations

**Visual:**
- Background: Transparent
- Text: Deep Navy
- Hover: Light gray background

**Example:**
```html
<button class="btn btn-ghost">
  Xem thêm
</button>
```

### Destructive Button

**Usage:** Delete, remove, destructive actions

**Visual:**
- Background: Error Red (#EF4444)
- Text: White
- Requires confirmation modal

**Example:**
```html
<button class="btn btn-destructive">
  Xóa
</button>
```

## Button Sizes

### Large
- Padding: 16px 32px
- Font Size: 18px
- Usage: Hero CTAs, important actions

### Medium (Default)
- Padding: 12px 24px
- Font Size: 16px
- Usage: Standard actions

### Small
- Padding: 8px 16px
- Font Size: 14px
- Usage: Compact spaces, tables

### Icon Button
- Square: 40px × 40px (medium)
- Icon only, no text
- Usage: Toolbars, actions

## Button States

### Loading State
- Show spinner icon
- Disable interaction
- Text: "Đang xử lý..." (Processing...)

### Disabled State
- Gray background (#E5E5E5)
- Gray text (#8A8A8A)
- No hover effect
- Cursor: not-allowed

### Success State
- Brief green checkmark animation
- Then return to normal state

## Accessibility

### Requirements
- Minimum touch target: 44px × 44px (mobile)
- Keyboard accessible (Tab, Enter, Space)
- Focus indicator: 2px teal outline
- ARIA labels for icon-only buttons

### Screen Reader Support
```html
<button aria-label="Xuất hàng từ kho trung tâm">
  <Icon name="export" />
</button>
```

## Vietnamese Language Considerations

### Button Labels
- Use clear, action-oriented Vietnamese
- Avoid technical jargon
- Examples:
  - ✅ "Xuất hàng" (Export Products)
  - ✅ "Tạo hóa đơn" (Create Bill)
  - ✅ "Phê duyệt" (Approve)
  - ❌ "Submit" (English)
  - ❌ "Execute" (Too technical)

## Implementation Examples

### React Component (shadcn/ui)

```tsx
import { Button } from "@/components/ui/button"

// Primary
<Button variant="default">Xuất hàng</Button>

// Secondary
<Button variant="outline">Hủy</Button>

// Accent
<Button variant="accent">Xác nhận</Button>

// With Icon
<Button>
  <Icon name="plus" />
  Thêm sản phẩm
</Button>

// Loading
<Button disabled>
  <Spinner />
  Đang xử lý...
</Button>
```

### CSS Classes

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  font-family: var(--font-primary);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: all var(--duration-normal) var(--easing-ease-out);
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
}

.btn-primary:disabled {
  background-color: var(--color-bg-tertiary);
  color: var(--color-text-tertiary);
  cursor: not-allowed;
}
```

## Usage Guidelines

### Do's
✅ Use primary button for main action on screen  
✅ Use clear, action-oriented labels  
✅ Provide loading states for async actions  
✅ Confirm destructive actions  
✅ Use appropriate size for context

### Don'ts
❌ Don't use multiple primary buttons on one screen  
❌ Don't use vague labels ("Click here", "Submit")  
❌ Don't disable buttons without explanation  
❌ Don't use buttons for navigation (use links)  
❌ Don't make buttons too small for touch

## Related Components

- [Forms](forms.md) - Form inputs and validation
- [Alerts](alerts.md) - Success/error feedback
- [Loading States](loading.md) - Loading indicators

---

*Buttons guide users through actions. Make them clear, accessible, and action-oriented.*

