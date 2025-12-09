# UI/UX Mood & Tone

**Last Updated:** 2025-12-09  
**Version:** 1.0

## Overview

This document defines the emotional atmosphere (mood) and stylistic approach (tone) for all user interfaces and user experiences. These guidelines ensure that every interaction with our product feels consistent, professional, and aligned with our brand identity.

## UI Mood: "Confident Efficiency"

### Core Mood Characteristics

**Professional Trust**
- The interface feels reliable and trustworthy
- Users should feel confident that the system will work correctly
- Professional appearance without being cold or corporate

**Efficient Clarity**
- Every screen has a clear purpose
- Information is organized logically
- Users can accomplish tasks quickly without confusion

**Modern but Grounded**
- Contemporary design without being trendy
- Professional without being dated
- Approachable without being casual

**Vietnamese Business Appropriate**
- Respectful of business hierarchy and workflows
- Appropriate for professional Vietnamese business context
- Culturally sensitive and locally relevant

### Mood Expression Through Design

**Visual Elements:**
- **Colors:** Deep navy conveys trust, teal adds energy, gold highlights value
- **Typography:** Clear, readable Inter font—professional and modern
- **Spacing:** Generous whitespace for clarity and breathing room
- **Layout:** Organized, structured, but not rigid

**Interaction Elements:**
- **Buttons:** Clear, confident, with appropriate visual weight
- **Forms:** Organized, logical flow, helpful guidance
- **Navigation:** Intuitive, consistent, predictable
- **Feedback:** Immediate, clear, helpful

**Content Elements:**
- **Icons:** Clear, recognizable, consistent style
- **Images:** Professional, relevant, high quality
- **Data Visualization:** Clear, accurate, easy to understand
- **Empty States:** Helpful, encouraging, actionable

## UI Tone: "Helpful Professional"

### Tone Characteristics by Context

#### 1. Navigation & Structure

**Tone:** Clear, organized, predictable

**Principles:**
- Navigation should be obvious and consistent
- Users should always know where they are
- Structure should reflect business logic (not technical structure)

**Examples:**
- ✅ "Inventory" → "Central Warehouse" → "Import Products"
- ✅ Clear breadcrumbs: "Home > Products > Product Catalog"
- ❌ Technical terms: "API" → "Endpoints" → "Resources"

#### 2. Forms & Input

**Tone:** Helpful, guiding, forgiving

**Principles:**
- Provide clear labels and helpful hints
- Validate in real-time when possible
- Show errors clearly with solutions
- Use Vietnamese business terms appropriately

**Examples:**
- ✅ Label: "Tên sản phẩm" (Product Name)
- ✅ Hint: "Nhập tên sản phẩm để bán cho khách hàng" (Enter product name for customer sales)
- ✅ Error: "Tên sản phẩm không được để trống" (Product name cannot be empty)
- ❌ Generic: "Field is required"

#### 3. Data Display & Tables

**Tone:** Clear, scannable, informative

**Principles:**
- Present data in logical, scannable formats
- Use appropriate formatting (currency, dates, numbers)
- Highlight important information
- Make data actionable when possible

**Examples:**
- ✅ Currency: "1,000,000 VND" (formatted, clear)
- ✅ Dates: "09/01/2025" (Vietnamese format: DD/MM/YYYY)
- ✅ Status: Color-coded badges with clear labels
- ❌ Raw data: "1000000" (unformatted)

#### 4. Actions & Buttons

**Tone:** Confident, clear, appropriate

**Principles:**
- Button labels should clearly state the action
- Use appropriate visual weight (primary vs. secondary)
- Confirm destructive actions
- Provide feedback after actions

**Examples:**
- ✅ Primary: "Xuất hàng" (Export Products) - Teal, bold
- ✅ Secondary: "Hủy" (Cancel) - Gray, outlined
- ✅ Destructive: "Xóa" (Delete) - Red, with confirmation
- ❌ Vague: "Submit" (what are you submitting?)

#### 5. Feedback & Messages

**Tone:** Helpful, clear, solution-oriented

**Success Messages:**
- ✅ "Xuất hàng đã được phê duyệt. Sản phẩm sẽ có tại chi nhánh trong 24 giờ."
  (Export approved. Products will be available at branch within 24 hours.)

**Error Messages:**
- ✅ "Không thể kết nối. Dữ liệu của bạn đã được lưu và sẽ đồng bộ khi có kết nối."
  (Cannot connect. Your data is saved and will sync when connection is available.)

**Warning Messages:**
- ✅ "Mức tồn kho thấp. Vui lòng nhập thêm sản phẩm để tránh hết hàng."
  (Low inventory level. Please import more products to avoid stockouts.)

#### 6. Empty States

**Tone:** Encouraging, helpful, actionable

**Principles:**
- Explain why the state is empty
- Provide clear next steps
- Use friendly but professional language
- Include helpful illustrations or icons

**Examples:**
- ✅ "Chưa có sản phẩm nào. Bắt đầu bằng cách thêm sản phẩm đầu tiên."
  (No products yet. Start by adding your first product.)
- ✅ Include: "Thêm sản phẩm" (Add Product) button
- ❌ "No data available" (unhelpful, generic)

#### 7. Loading States

**Tone:** Reassuring, informative, patient

**Principles:**
- Show progress when possible
- Explain what's happening
- Reassure users that work is being saved
- Use appropriate loading indicators

**Examples:**
- ✅ "Đang đồng bộ dữ liệu..." (Syncing data...)
- ✅ Progress bar for long operations
- ✅ Skeleton screens for content loading
- ❌ Generic spinner with no context

## Emotional Journey Mapping

### First-Time User Experience

**Mood Progression:**
1. **Welcome:** Warm, professional, reassuring
2. **Onboarding:** Helpful, guiding, not overwhelming
3. **First Task:** Clear, supportive, encouraging
4. **Success:** Positive, confirming, empowering

**Tone Shifts:**
- Start: More welcoming and explanatory
- Middle: More efficient and direct
- End: More confident and empowering

### Returning User Experience

**Mood:** Efficient, familiar, powerful

**Tone:**
- Less explanation, more action
- Quick access to common tasks
- Confident that user knows the system
- Still helpful when needed

### Error & Recovery Experience

**Mood:** Reassuring, helpful, solution-focused

**Tone:**
- Acknowledge the issue clearly
- Explain what happened (if helpful)
- Provide clear next steps
- Reassure that data is safe

## Cultural Considerations

### Vietnamese Business Context

**Respect for Hierarchy:**
- UI should reflect approval workflows
- Show clear authority levels
- Respect decision-making processes

**Value Relationships:**
- Use respectful language ("Quý khách" for customers)
- Acknowledge partnerships
- Emphasize long-term relationships

**Practical Focus:**
- Emphasize real benefits over abstract concepts
- Show concrete examples
- Use Vietnamese business terminology

**Local Understanding:**
- Vietnamese date format (DD/MM/YYYY)
- Vietnamese currency (VND, ₫)
- Vietnamese business hours and practices
- Local integrations (Zalo, local payment methods)

## Interaction Patterns

### Micro-interactions

**Purpose:** Provide feedback, guide users, add polish

**Principles:**
- Subtle but noticeable
- Fast and responsive
- Purposeful (not decorative)
- Consistent across the system

**Examples:**
- Button hover: Slight scale or color change
- Form validation: Real-time feedback
- Success actions: Brief confirmation animation
- Loading: Smooth progress indicators

### Transitions

**Purpose:** Connect states smoothly, maintain context

**Principles:**
- Smooth and natural
- Fast enough to feel instant
- Slow enough to be perceived
- Consistent timing

**Examples:**
- Page transitions: 200-300ms
- Modal appearances: 250ms with ease-out
- List updates: Smooth, not jarring
- State changes: Clear but not distracting

## Accessibility & Inclusivity

### Mood: Welcoming to All

**Tone:** Clear, helpful, respectful

**Principles:**
- Design for all abilities
- Provide multiple ways to access information
- Use clear language
- Support assistive technologies

**Implementation:**
- WCAG 2.1 AA minimum compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast options
- Clear focus indicators

## Mood & Tone Checklist

### Before Shipping Any UI

**Mood Check:**
- [ ] Does it feel professional and trustworthy?
- [ ] Is the purpose clear and obvious?
- [ ] Does it feel efficient and organized?
- [ ] Is it appropriate for Vietnamese business context?

**Tone Check:**
- [ ] Is the language clear and helpful?
- [ ] Are actions and labels obvious?
- [ ] Is feedback immediate and useful?
- [ ] Are error messages solution-oriented?
- [ ] Is the tone appropriate for the context?

**Cultural Check:**
- [ ] Are Vietnamese business terms used correctly?
- [ ] Is the format appropriate (dates, currency)?
- [ ] Is the language respectful and professional?
- [ ] Are local practices considered?

---

**Related Documents:**
- [Tone of Voice](tone-of-voice.md) - Written communication tone
- [Color Palette](color-palette.md) - Visual mood through color
- [Typography](typography.md) - Typography mood
- [Motion Principles](motion-principles.md) - Animation mood

