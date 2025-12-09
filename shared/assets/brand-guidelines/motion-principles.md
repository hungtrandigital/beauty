# Motion Principles

**Last Updated:** 2025-12-09  
**Version:** 1.0

## Overview

Motion and animation in our interface should feel purposeful, polished, and professional. Every animation should serve a clear function—providing feedback, maintaining context, or guiding attention—never purely decorative.

## Core Principles

### 1. Purposeful Motion

**Every animation must have a purpose:**
- Provide feedback (button press, form validation)
- Maintain context (page transitions, state changes)
- Guide attention (important notifications, progress)
- Enhance understanding (data visualization, complex interactions)

**Never animate:**
- Just for decoration
- Without clear benefit
- In ways that distract from content
- At the expense of performance

### 2. Professional Polish

**Motion should feel:**
- Smooth and refined
- Consistent across the system
- Appropriate for business software
- Subtle but noticeable

**Avoid:**
- Bouncy, playful animations (too casual)
- Overly dramatic effects (unprofessional)
- Inconsistent timing (feels broken)
- Performance-heavy animations (feels slow)

### 3. Efficient & Fast

**Speed Guidelines:**
- **Micro-interactions:** 100-200ms (instant feedback)
- **Transitions:** 200-300ms (smooth but fast)
- **Complex animations:** 300-500ms (perceptible but not slow)
- **Page transitions:** 250-400ms (maintain context)

**Never exceed:**
- 500ms for most interactions
- 1000ms for complex state changes
- Always respect user's reduced motion preferences

### 4. Contextual Awareness

**Motion should:**
- Respect user preferences (reduced motion)
- Adapt to device capabilities
- Consider network conditions
- Maintain accessibility

## Animation Types

### 1. Micro-interactions

**Purpose:** Provide immediate feedback for user actions

**Examples:**
- Button press: Slight scale (0.95) or color change
- Checkbox toggle: Smooth state change (200ms)
- Switch toggle: Smooth slide animation (200ms)
- Link hover: Color transition (150ms)

**Timing:**
- Duration: 100-200ms
- Easing: ease-out or ease-in-out
- Scale: Subtle (0.95-1.05 range)

### 2. Transitions

**Purpose:** Connect states smoothly, maintain context

**Page Transitions:**
- Duration: 250-300ms
- Easing: ease-in-out
- Effect: Fade or slide (subtle)
- Maintain scroll position when possible

**Modal/Dialog:**
- Duration: 250ms
- Easing: ease-out
- Effect: Fade + scale (0.95 → 1.0)
- Backdrop: Fade in (200ms)

**List Updates:**
- Duration: 300ms
- Easing: ease-in-out
- Effect: Smooth add/remove with slight fade
- Maintain scroll position

### 3. Loading States

**Purpose:** Reassure users that work is happening

**Skeleton Screens:**
- Subtle shimmer animation
- Duration: 1.5s (loop)
- Easing: ease-in-out
- Low opacity (10-15%)

**Progress Indicators:**
- Smooth progress bar animation
- Duration: Matches actual progress
- Easing: linear (for progress bars)
- Show percentage when helpful

**Spinners:**
- Smooth rotation
- Duration: 1s (loop)
- Easing: linear
- Use sparingly (prefer progress bars)

### 4. Feedback Animations

**Purpose:** Confirm actions, show results

**Success Feedback:**
- Duration: 300ms
- Effect: Fade in + slight scale (0.95 → 1.0)
- Color: Success green
- Auto-dismiss: 3-5 seconds

**Error Feedback:**
- Duration: 300ms
- Effect: Fade in + slight shake (subtle)
- Color: Error red
- Persistent until dismissed

**Notification:**
- Duration: 300ms (in), 200ms (out)
- Effect: Slide from top + fade
- Position: Top-right or top-center
- Stack: Multiple notifications stack vertically

### 5. Data Visualization

**Purpose:** Help users understand data changes

**Charts & Graphs:**
- Duration: 500-800ms
- Easing: ease-out
- Effect: Animate from zero or previous value
- Stagger: Slight delay between elements (50-100ms)

**Counters:**
- Duration: 800ms-1.2s
- Easing: ease-out
- Effect: Count up from previous value
- Format: Smooth number increment

## Timing Functions (Easing)

### Standard Easing Curves

**ease-out (Most Common)**
- Use for: Most UI animations
- Feel: Natural deceleration
- CSS: `cubic-bezier(0.4, 0, 0.2, 1)`

**ease-in-out**
- Use for: State changes, transitions
- Feel: Smooth start and end
- CSS: `cubic-bezier(0.4, 0, 0.2, 1)`

**ease-in**
- Use for: Exit animations
- Feel: Gradual acceleration
- CSS: `cubic-bezier(0.4, 0, 1, 1)`

**linear**
- Use for: Progress bars, spinners
- Feel: Constant speed
- CSS: `linear`

### Custom Easing

**For Premium Feel:**
- Use: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (smooth, refined)
- Apply to: Important interactions, premium features

## Performance Guidelines

### 60 FPS Target

**Always aim for:**
- 60 frames per second (16.67ms per frame)
- Smooth, jank-free animations
- Responsive to user input

### Optimization Techniques

**Use CSS Transforms:**
- Prefer `transform` and `opacity` (GPU accelerated)
- Avoid animating `width`, `height`, `top`, `left` (layout triggers)

**Will-Change:**
- Use `will-change` sparingly for complex animations
- Remove after animation completes

**Reduce Motion:**
- Always respect `prefers-reduced-motion`
- Provide static alternatives
- Test with reduced motion enabled

### When to Skip Animation

**Skip animation when:**
- User has reduced motion preference
- Device is low-powered
- Network is slow
- Animation would be distracting
- Performance would suffer

## Accessibility

### Reduced Motion Support

**Always check:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Provide alternatives:**
- Static states for animated content
- Text alternatives for motion-based information
- Clear focus indicators (not just motion)

### Motion for Communication

**Use motion to:**
- Indicate state changes
- Show relationships between elements
- Guide attention to important information
- Provide feedback for actions

**Never rely solely on motion:**
- Always provide text/color alternatives
- Ensure information is accessible without motion
- Test with screen readers

## Implementation Examples

### Button Hover

```css
.button {
  transition: background-color 150ms ease-out,
              transform 150ms ease-out;
}

.button:hover {
  background-color: var(--color-accent-dark);
  transform: scale(0.98);
}
```

### Modal Appearance

```css
.modal {
  animation: modalIn 250ms ease-out;
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### List Item Add

```css
.list-item {
  animation: itemIn 300ms ease-out;
}

@keyframes itemIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Success Notification

```css
.notification-success {
  animation: slideIn 300ms ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Motion Checklist

### Before Implementing Animation

**Purpose:**
- [ ] Does this animation serve a clear purpose?
- [ ] Will it improve user understanding or feedback?
- [ ] Is it necessary, or could it be static?

**Performance:**
- [ ] Will it run at 60 FPS?
- [ ] Is it optimized (using transforms/opacity)?
- [ ] Does it respect reduced motion preferences?

**Consistency:**
- [ ] Does it match other animations in the system?
- [ ] Is the timing appropriate for the context?
- [ ] Is the easing curve consistent?

**Accessibility:**
- [ ] Does it work with reduced motion?
- [ ] Is information accessible without motion?
- [ ] Are alternatives provided?

---

**Related Documents:**
- [UI/UX Mood & Tone](ui-ux-mood-tone.md) - Overall design mood
- [Color Palette](color-palette.md) - Color transitions
- [Typography](typography.md) - Text animations

