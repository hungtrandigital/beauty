# Execution Mode — AI-First Startup Factory

**Version:** v3.0  
**Purpose:** Define the scope, activities, and workflow for Execution Mode (strategic/creative deliverables)

## Overview

Execution Mode is the strategic and creative execution phase where agents create actual deliverables—designs, marketing assets, content, and creative materials—based on approved plans, brand guidelines, and strategic specifications. This mode focuses on bringing creative and strategic plans to life through visual and content deliverables.

**Command:** Use `/execution` in Cursor IDE to activate this mode.

**Agency Type:** Strategic/Creative Agency

## When to Use Execution Mode

Use Execution Mode when:
- **Creating UI/UX designs** - Designing user interfaces, wireframes, prototypes
- **Creating graphics** - Illustrations, icons, visual assets
- **Creating brand assets** - Brand guidelines implementation, visual identity elements
- **Writing marketing copy** - Landing pages, ads, social content, email sequences
- **Creating marketing creatives** - Ad visuals, social media graphics, campaign materials
- **Creating pitch deck visuals** - Pitch deck slides, fundraising materials
- **Writing content** - Blog posts, articles, strategic documentation
- **Creating moodboards and art direction** - Creative direction deliverables

## Core Activities

### 0. Read Current Scope (ALWAYS START HERE)

**Before starting any execution:**
1. **Read `shared/context/current-scope.md`** - Understand finalized scope and context
2. **Read relevant plans** - Review plans from Plan Mode:
   - Product requirements from `2-product-foundation/requirements/`
   - Marketing strategy from `4-marketing/go-to-market.md`
   - Brand guidelines from `shared/assets/brand-guidelines/`
   - Pitch deck outline from `5-financing/pitches/outline.md` (if exists)
3. **Verify execution aligns with plans** - Ensure deliverables match approved plans
4. **If plans are unclear or missing:**
   - Ask user to complete planning in Plan Mode first
   - Or ask clarifying questions before proceeding

**Action:** Always read scope and plans first, then execute according to approved specifications.

### 1. Design Execution

**UI/UX Design:**
- **User Interfaces:** Create UI designs in `shared/assets/ui-ux/designs/`
- **Wireframes:** Create wireframes in `shared/assets/ui-ux/wireframes/`
- **Prototypes:** Create interactive prototypes in `shared/assets/ui-ux/prototypes/`
- **Design Systems:** Create design system components in `shared/assets/ui-ux/design-system/`
- **User Flows:** Create user flow diagrams in `shared/assets/ui-ux/flows/`

**Graphics & Visual Assets:**
- **Illustrations:** Create illustrations in `shared/assets/graphics/illustrations/`
- **Icons:** Create icon sets in `shared/assets/graphics/icons/`
- **Visual Elements:** Create visual elements in `shared/assets/graphics/elements/`

**Brand Assets:**
- **Visual Identity:** Create visual identity elements in `shared/assets/brand-guidelines/visual-identity/`
- **Brand Applications:** Create brand application examples
- **Note:** Brand guidelines foundation is created in Plan Mode; Execution Mode creates actual brand assets

### 2. Content Creation

**Marketing Copy:**
- **Landing Pages:** Write copy for hero, features, pricing, testimonials in `4-marketing/copy/landing-pages/`
- **Paid Ads:** Write ad copy for Meta, Google, LinkedIn, Twitter in `4-marketing/copy/ads/`
- **Social Content:** Write social media posts in `4-marketing/copy/social/`
- **Email Sequences:** Write email copy in `4-marketing/copy/emails/`
- **Product Copy:** Write product descriptions, feature copy

**Content Writing:**
- **Blog Posts:** Create blog posts and articles in `4-marketing/content/blog/`
- **Articles:** Write articles and thought leadership content
- **Documentation:** Write strategic documentation (non-technical)

### 3. Creative Assets

**Marketing Creatives:**
- **Ad Creatives:** Create ad visuals in `4-marketing/creatives/ads/`
- **Social Graphics:** Create social media graphics in `4-marketing/creatives/social/`
- **Campaign Materials:** Create campaign-specific creatives in `4-marketing/creatives/campaigns/`

**Pitch Deck Visuals:**
- **Pitch Deck Slides:** Create pitch deck visuals in `5-financing/pitches/visuals/`
- **Fundraising Materials:** Create fundraising visuals and materials
- **Note:** Pitch deck outline and structure are planned in Plan Mode; Execution Mode creates actual visuals

**Creative Direction:**
- **Moodboards:** Create moodboards in `shared/assets/moodboards/`
- **Art Direction Briefs:** Create art direction briefs in `shared/assets/ui-ux/art-direction/`
- **Creative Decks:** Create creative decks for campaigns or launches

### 4. Strategic Documentation Execution

**Content Calendars:**
- Create detailed content calendars based on content strategy from Plan Mode
- Plan content execution timeline

**Campaign Execution Plans:**
- Create detailed campaign execution plans based on marketing strategy
- Plan campaign asset creation timeline

## Allowed Actions

✅ **You CAN:**
- **Read `shared/context/current-scope.md`** - Always read scope before starting execution
- **Read plans from Plan Mode** - Review requirements, marketing strategy, brand guidelines
- Create UI/UX designs, wireframes, prototypes
- Create graphics, illustrations, visual assets
- Create brand assets (based on brand guidelines from Plan Mode)
- Write marketing copy and content
- Create marketing creatives and campaign materials
- Create pitch deck visuals (based on outline from Plan Mode)
- Create moodboards and art direction briefs
- Create content calendars and campaign execution plans
- Update progress and changelog files

## Forbidden Actions

❌ **You CANNOT:**
- Write code in `3-technical/3.4-source-code/` (use Code Mode)
- Create brand guidelines foundation (use Plan Mode - Creative Director)
- Plan marketing strategy (use Plan Mode - Marketing Expert)
- Plan product requirements (use Plan Mode - Product Strategist)
- Plan technical architecture (use Plan Mode - System Architecture)
- Skip brand guidelines (all designs must align with brand guidelines)
- Create designs without approved requirements
- Skip Creative Director approval (for visual assets)
- Create content without marketing strategy alignment
- Create files outside the defined structure

## Output Locations

All Execution Mode outputs go to:
- **UI/UX Designs:** `shared/assets/ui-ux/`
  - `designs/` - UI designs
  - `wireframes/` - Wireframes
  - `prototypes/` - Interactive prototypes
  - `design-system/` - Design system components
  - `flows/` - User flow diagrams
- **Graphics:** `shared/assets/graphics/`
  - `illustrations/` - Illustrations
  - `icons/` - Icon sets
  - `elements/` - Visual elements
- **Brand Assets:** `shared/assets/brand-guidelines/visual-identity/`
- **Marketing Copy:** `4-marketing/copy/`
  - `landing-pages/` - Landing page copy
  - `ads/` - Ad copy
  - `social/` - Social media copy
  - `emails/` - Email sequences
- **Marketing Creatives:** `4-marketing/creatives/`
  - `ads/` - Ad visuals
  - `social/` - Social graphics
  - `campaigns/` - Campaign materials
- **Content:** `4-marketing/content/blog/`
- **Pitch Deck Visuals:** `5-financing/pitches/visuals/`
- **Moodboards:** `shared/assets/moodboards/`
- **Art Direction:** `shared/assets/ui-ux/art-direction/`
- **Progress:** `3-technical/3.2-implementation/status/progress.md`
- **Changelog:** `8-governance/changelog.md`

## Mode Transition

Execution Mode typically transitions to:
- **Review Mode** - When creative assets are ready for Creative Director approval
- **Code Mode** - When designs are ready for frontend implementation
- **Plan Mode** - When execution reveals gaps in planning
- **Execution Mode** (continue) - When iterating on creative deliverables

## Pre-Execution Checklist

Before starting execution, ensure:
- ✅ Brand guidelines exist (from Plan Mode or Creative Director)
- ✅ Product requirements are clear (from Plan Mode)
- ✅ Marketing strategy is defined (from Plan Mode)
- ✅ Creative direction is approved (for visual assets)
- ✅ Pitch deck outline exists (for pitch deck visuals)

## Quality Standards

Execution Mode must meet:
- **Brand Consistency:** All designs align with brand guidelines
- **Accessibility:** WCAG 2.1 AA minimum (for UI designs)
- **Creative Director Approval:** All visual assets must be approved
- **Marketing Strategy Alignment:** All content aligns with marketing strategy
- **User Experience Quality:** Designs meet UX best practices
- **Content Quality:** Copy is clear, compelling, and on-brand

## Orchestration Handoff Format

When in Execution Mode, use this format:

```markdown
**Current mode**: execution  
**Task completed**: [Yes/No/Partial]  
**Deliverable Type**: [Design/Content/Creative Asset]

**Files created/modified**:
- `shared/assets/[paths]` (for designs/graphics) OR
- `4-marketing/[paths]` (for marketing assets) OR
- `5-financing/pitches/visuals/` (for pitch deck visuals)
- `3-technical/3.2-implementation/status/progress.md`
- `8-governance/changelog.md`

**Brand Guidelines Alignment**: [Yes/No - Aligned with brand guidelines]
**Creative Director Approval**: [Pending/Approved/Not Required]

**Next recommended agent**: @creative-director (for review) OR @ui-ux-designer (for iteration) OR @fullstack-engineer (if ready for implementation)  
**Next task**: "[Clear task description]"  
**Priority**: [High/Medium/Low]

**Blockers/Issues**: [None / List any blockers]
```

## Success Criteria

Execution Mode is successful when:
- ✅ All designs are on-brand and accessible
- ✅ All content aligns with marketing strategy
- ✅ Creative Director approval obtained (for visual assets)
- ✅ All deliverables meet quality standards
- ✅ Progress is tracked and changelog updated
- ✅ Designs are ready for implementation (if transitioning to Code Mode)

## Related Documents

- **[UI/UX Designer Agent](../agents/ui-ux-designer.md)** - Primary agent for UI/UX design execution
- **[Graphics Designer Agent](../agents/graphics-designer.md)** - Primary agent for graphics execution
- **[Marketing Expert Agent](../agents/marketing-expert.md)** - Primary agent for marketing content execution
- **[Creative Director Agent](../agents/creative-director.md)** - Creative direction and approval (review)
- **[Plan Mode](plan.md)** - Creates plans and specifications that Execution Mode executes
- **[Code Mode](code.md)** - Technical implementation (receives designs from Execution Mode)
- **[Global Rules](../_core/global-rules.md)** - Repository rules and constraints

---

**Remember:** Execution Mode is about creating strategic and creative deliverables.  
Brand consistency > creativity. Alignment > originality.

