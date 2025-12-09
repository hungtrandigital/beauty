# Form Components

**Last Updated:** 2025-12-09  
**Version:** 1.0

## Overview

Forms are critical for data input in our system. They must be simple, clear, and helpful—especially for users with limited tech experience. All forms follow Vietnamese business context and terminology.

## Form Structure

### Basic Form Layout

```
┌─────────────────────────────────┐
│ Form Title                       │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Label                        │ │
│ │ [Input Field]                │ │
│ │ Helper Text (optional)       │ │
│ └─────────────────────────────┘ │
│                                 │
│ [Primary Button] [Secondary]    │
└─────────────────────────────────┘
```

## Input Types

### Text Input

**Usage:** Names, descriptions, general text

**Visual:**
- Border: 1px solid #E5E5E5
- Border Radius: 8px
- Padding: 12px 16px
- Font Size: 16px
- Focus: 2px teal outline (#00A8A8)

**Example:**
```html
<label>Tên sản phẩm</label>
<input type="text" placeholder="Nhập tên sản phẩm" />
<span class="helper-text">Tên sản phẩm sẽ hiển thị cho khách hàng</span>
```

### Number Input

**Usage:** Quantities, prices, amounts

**Visual:**
- Right-aligned text
- Monospace font for numbers
- Format: Vietnamese number format (1.000.000)

**Example:**
```html
<label>Số lượng</label>
<input type="number" placeholder="0" />
<span class="helper-text">Nhập số lượng sản phẩm</span>
```

### Currency Input

**Usage:** Prices, amounts in VND

**Visual:**
- Right-aligned
- Monospace font
- Format: "1.000.000 ₫" or "1,000,000 VND"
- Currency symbol on right

**Example:**
```html
<label>Giá bán</label>
<div class="currency-input">
  <input type="text" placeholder="0" />
  <span class="currency-symbol">₫</span>
</div>
```

### Select/Dropdown

**Usage:** Choices from predefined options

**Visual:**
- Same styling as text input
- Dropdown arrow icon
- Clear selected value option

**Example:**
```html
<label>Chi nhánh</label>
<select>
  <option>Chọn chi nhánh</option>
  <option>Chi nhánh 1 - Quận 1</option>
  <option>Chi nhánh 2 - Quận 3</option>
</select>
```

### Textarea

**Usage:** Long text, descriptions, notes

**Visual:**
- Same border and focus styles
- Resizable (vertical only)
- Character count (if limit exists)

**Example:**
```html
<label>Ghi chú</label>
<textarea rows="4" placeholder="Nhập ghi chú (tùy chọn)"></textarea>
<span class="char-count">0 / 500</span>
```

### Checkbox

**Usage:** Multiple selections, toggles

**Visual:**
- Square checkbox
- Teal when checked
- Clear label text

**Example:**
```html
<label class="checkbox">
  <input type="checkbox" />
  <span>Áp dụng cho tất cả chi nhánh</span>
</label>
```

### Radio Button

**Usage:** Single selection from options

**Visual:**
- Circular radio button
- Teal when selected
- Grouped options

**Example:**
```html
<fieldset>
  <legend>Loại sản phẩm</legend>
  <label class="radio">
    <input type="radio" name="type" value="regular" />
    <span>Sản phẩm thường</span>
  </label>
  <label class="radio">
    <input type="radio" name="type" value="dye" />
    <span>Sản phẩm nhuộm</span>
  </label>
</fieldset>
```

## Form Validation

### Real-Time Validation

**Principles:**
- Validate on blur (after user leaves field)
- Show errors immediately
- Provide clear solutions
- Use Vietnamese language

### Error States

**Visual:**
- Red border (#EF4444)
- Error icon
- Error message below field
- Red text color

**Example:**
```html
<label>Tên sản phẩm</label>
<input type="text" class="error" />
<span class="error-message">Tên sản phẩm không được để trống</span>
```

### Success States

**Visual:**
- Green border (#10B981)
- Success checkmark icon
- Subtle green background

### Validation Messages

**Good Examples:**
- ✅ "Tên sản phẩm không được để trống"
- ✅ "Số lượng phải lớn hơn 0"
- ✅ "Email không hợp lệ. Vui lòng nhập đúng định dạng email"

**Bad Examples:**
- ❌ "Field is required"
- ❌ "Invalid input"
- ❌ "Error"

## Form Labels

### Label Requirements

**Always include:**
- Clear, descriptive label
- Required indicator (*) for required fields
- Helper text for complex fields
- Vietnamese business terminology

**Example:**
```html
<label>
  Tên sản phẩm <span class="required">*</span>
</label>
<input type="text" />
<span class="helper-text">Tên sản phẩm sẽ hiển thị cho khách hàng khi thanh toán</span>
```

## Form Layout

### Single Column (Default)

**Usage:** Most forms, especially on mobile

```
┌─────────────────────┐
│ Field 1             │
│ [Input]             │
│                     │
│ Field 2             │
│ [Input]             │
│                     │
│ Field 3             │
│ [Input]             │
└─────────────────────┘
```

### Two Column (Desktop)

**Usage:** Forms with many fields, desktop only

```
┌──────────────┬──────────────┐
│ Field 1      │ Field 2      │
│ [Input]      │ [Input]      │
│              │              │
│ Field 3      │ Field 4      │
│ [Input]      │ [Input]      │
└──────────────┴──────────────┘
```

## Form Actions

### Button Placement

**Single Action:**
- Right-aligned
- Primary button

**Multiple Actions:**
- Right-aligned
- Primary button (rightmost)
- Secondary button (left of primary)

**Example:**
```html
<div class="form-actions">
  <button class="btn btn-secondary">Hủy</button>
  <button class="btn btn-primary">Lưu</button>
</div>
```

## Accessibility

### Requirements
- All inputs have associated labels
- Required fields clearly marked
- Error messages associated with inputs (aria-describedby)
- Keyboard navigation support
- Focus indicators visible

### Screen Reader Support
```html
<label for="product-name">
  Tên sản phẩm <span class="sr-only">(bắt buộc)</span>
</label>
<input 
  id="product-name"
  type="text"
  aria-required="true"
  aria-describedby="product-name-error"
/>
<span id="product-name-error" class="error-message" role="alert">
  Tên sản phẩm không được để trống
</span>
```

## Vietnamese Language Considerations

### Date Format
- Format: DD/MM/YYYY
- Placeholder: "09/12/2025"
- Use date picker component

### Currency Format
- Format: 1.000.000 ₫ or 1,000,000 VND
- Always show currency symbol
- Use monospace font for numbers

### Phone Number Format
- Format: 0901 234 567 or 090-123-4567
- Vietnamese phone number validation

## Implementation Examples

### React Hook Form + Zod

```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const productSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm không được để trống"),
  price: z.number().min(0, "Giá phải lớn hơn 0"),
  quantity: z.number().int().min(0, "Số lượng phải là số nguyên dương"),
})

function ProductForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(productSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field">
        <label>
          Tên sản phẩm <span className="required">*</span>
        </label>
        <input {...register("name")} />
        {errors.name && (
          <span className="error-message">{errors.name.message}</span>
        )}
      </div>
      {/* More fields... */}
    </form>
  )
}
```

## Usage Guidelines

### Do's
✅ Use clear, descriptive labels  
✅ Provide helpful placeholder text  
✅ Show validation errors immediately  
✅ Use Vietnamese business terminology  
✅ Group related fields  
✅ Show required indicators

### Don'ts
❌ Don't use technical jargon  
❌ Don't hide validation until submit  
❌ Don't use vague error messages  
❌ Don't skip labels  
❌ Don't make forms too long (break into steps)

## Related Components

- [Buttons](buttons.md) - Form action buttons
- [Alerts](alerts.md) - Form success/error messages
- [Loading States](loading.md) - Form submission loading

---

*Forms are how users input data. Make them simple, clear, and helpful.*

