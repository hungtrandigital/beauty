# Full Plan Documents Index

**Last Updated:** 2025-12-09  
**Purpose:** Complete reference guide to all planning documents in the project

## Overview

This document provides a comprehensive index of all planning documents organized by category. Use this as a navigation guide to find specific planning information.

---

## 📋 Table of Contents

1. [Product Planning](#product-planning)
2. [Technical Planning](#technical-planning)
3. [Implementation Planning](#implementation-planning)
4. [Marketing Planning](#marketing-planning)
5. [Financial Planning](#financial-planning)
6. [Architecture Decision Records](#architecture-decision-records)

---

## 1. Product Planning

**Location:** `2-product-foundation/`

### Core Documents

#### Product Overview
- **File:** `2-product-foundation/2.1-product-overview.md`
- **Content:** Product vision, mission, goals, success metrics, target users, core features, roadmap
- **Status:** ✅ Complete

#### Product Backlog
- **File:** `2-product-foundation/2.2-product-backlog/backlog.md`
- **Content:** 8 epics with user stories, acceptance criteria, RICE prioritization
- **Status:** ✅ Complete

#### Product Delivery Plan
- **File:** `2-product-foundation/product-delivery-plan.md`
- **Content:** Comprehensive 15-month delivery plan integrating technical, marketing, operations, and launch strategies
- **Status:** ✅ Complete

### Product Requirements Documents (PRDs)

#### Inventory Management
- **Location:** `2-product-foundation/requirements/inventory-management/`
- **Files:**
  - `README.md` - Overview
  - `user-stories.md` - User stories and acceptance criteria
  - `technical-specs.md` - Technical requirements
  - `success-metrics.md` - Success metrics and KPIs
  - `out-of-scope.md` - Out-of-scope items
- **Status:** ✅ Complete

#### Billing
- **Location:** `2-product-foundation/requirements/billing/`
- **Files:**
  - `README.md` - Overview
  - `user-stories.md` - User stories and acceptance criteria
  - `technical-specs.md` - Technical requirements
  - `success-metrics.md` - Success metrics and KPIs
  - `out-of-scope.md` - Out-of-scope items
- **Status:** ✅ Complete

#### Product Management
- **Location:** `2-product-foundation/requirements/product-management/`
- **Files:**
  - `README.md` - Overview
  - `user-stories.md` - User stories and acceptance criteria
  - `technical-specs.md` - Technical requirements
  - `success-metrics.md` - Success metrics and KPIs
  - `out-of-scope.md` - Out-of-scope items
- **Status:** ✅ Complete

---

## 2. Technical Planning

**Location:** `3-technical/3.1-system-foundation/`

### Infrastructure
- **File:** `3-technical/3.1-system-foundation/infrastructure.md`
- **Content:** 
  - Technology stack (Next.js, NestJS, PostgreSQL, Redis, CouchDB, AWS)
  - Cloud provider selection and regions
  - Scaling strategy
  - Cost estimates
- **Status:** ✅ Complete

### System Design
- **File:** `3-technical/3.1-system-foundation/design-standards/system-design.md`
- **Content:**
  - System design principles
  - Architectural patterns
  - High-level architecture (C4 model)
  - Data architecture
  - Technology stack details
- **Status:** ✅ Complete

### Domain Specifications
- **File:** `3-technical/3.1-system-foundation/architecture/domain-specs.md`
- **Content:**
  - Domain-Driven Design (DDD) model
  - Bounded contexts (6 contexts)
  - Core entities and relationships
  - Business rules
  - Domain services
- **Status:** ✅ Complete

### API Contracts
- **Location:** `3-technical/3.1-system-foundation/architecture/api-contracts/`
- **Files:**
  - `openapi.yaml` - OpenAPI 3.0 specification
  - `README.md` - API documentation overview
- **Status:** ✅ Complete (Sample API contracts defined)

### Coding Standards
- **File:** `3-technical/3.1-system-foundation/design-standards/coding-standards.md`
- **Content:**
  - Code organization principles
  - Naming conventions
  - TypeScript/JavaScript standards
  - NestJS standards
  - React/Next.js standards
  - Code review guidelines
  - Testing standards
- **Status:** ✅ Complete

---

## 3. Implementation Planning

**Location:** `3-technical/3.2-implementation/plans/`

### Implementation Plan Overview
- **File:** `3-technical/3.2-implementation/plans/plan-overview.md`
- **Content:**
  - High-level overview of 4 implementation phases
  - Key deliverables per phase
  - Current phase status
  - Key milestones
- **Status:** ✅ Complete

### Detailed Implementation Plan
- **File:** `3-technical/3.2-implementation/plans/plan.md`
- **Content:**
  - 14 sprints detailed breakdown
  - Task breakdown by epic
  - Dependencies and prerequisites
  - Resource planning
  - Security testing integration
- **Status:** ✅ Complete

### Product Delivery Plan
- **File:** `2-product-foundation/product-delivery-plan.md`
- **Content:**
  - Comprehensive 15-month delivery plan
  - 5 main phases (Preparation, Foundation, Customer Features, Reporting, Beta & Launch)
  - Integration of technical, marketing, operations, and launch strategies
  - Budget allocation by phase
  - Risk management
  - Success metrics
- **Status:** ✅ Complete
- **Note:** This is a product-level plan (not just technical), so it's located in `2-product-foundation/`

### Implementation Status
- **File:** `3-technical/3.2-implementation/status/progress.md`
- **Content:**
  - Current status and phase
  - Overall progress tracking
  - Active work items
  - Completed items
  - Upcoming tasks
- **Status:** ✅ Updated regularly

### Implementation History
- **File:** `3-technical/3.2-implementation/history/history.log.md`
- **Content:**
  - Sprint-by-sprint implementation history
  - Completed tasks
  - Files created/modified
  - Notes and decisions
- **Status:** ✅ Updated after each sprint

---

## 4. Marketing Planning

**Location:** `4-marketing/`

### Go-to-Market Strategy
- **File:** `4-marketing/go-to-market.md`
- **Content:**
  - Market positioning
  - Value proposition
  - Launch strategy (Beta → Soft Launch → Public Launch)
  - Marketing channels (5 categories)
  - Messaging framework
  - Success metrics
- **Status:** ✅ Complete

### Initial Go-to-Market Plan
- **File:** `1-ideas/1.3-initial-go-to-market-plan.md`
- **Content:**
  - Early-stage go-to-market strategy
  - Target market
  - Launch strategy overview
- **Status:** ✅ Complete (Superseded by go-to-market.md)

### Personas
- **File:** `4-marketing/personas.md`
- **Content:**
  - Primary personas (Minh - Chain Owner, Lan - System Admin, Hùng - Cashier)
  - Demographics, psychographics, pain points, goals
  - How the product helps each persona
- **Status:** ✅ Complete

---

## 5. Financial Planning

**Location:** `5-financing/`

### Financial Plans
- **File:** `5-financing/plans.md`
- **Content:**
  - Funding requirements (2-3B VND)
  - Budget allocation by category
  - Financial projections (12 months)
  - Key metrics and milestones
- **Status:** ✅ Complete

### Initial Financing Plan
- **File:** `1-ideas/1.2-initial-financing-plan.md`
- **Content:**
  - Initial funding needs
  - Breakdown by category
  - Funding sources
  - 12-month timeline
- **Status:** ✅ Complete (Superseded by plans.md)

---

## 6. Architecture Decision Records

**Location:** `8-governance/decision-log.md`

### ADRs
- **File:** `8-governance/decision-log.md`
- **Content:**
  - **ADR-001:** Brand Guidelines & Visual Identity System
  - **ADR-002:** Technology Stack Selection
- **Status:** ✅ Complete (2 ADRs documented)

---

## 7. Additional Planning Documents

### Market Research
- **Location:** `1-ideas/1.1-market-research/`
- **Files:**
  - `summaries.md` - Executive summary, TAM/SAM/SOM, competitive analysis
  - `reports/marketing-initiatives-analysis-2025-12.md` - Marketing initiatives framework
  - `reports/target-audience-insights-2025-12.md` - Target audience insights
- **Status:** ✅ Complete

### Security Testing Strategy
- **File:** `1-ideas/security-testing-strategy-2025-12.md`
- **Content:**
  - Security testing approach (shift-left)
  - Tools and processes (SAST, DAST, dependency scanning, IaC scanning)
  - Integration into SDLC
  - Sprint-by-sprint security tasks
- **Status:** ✅ Complete


---

## Quick Reference by Category

### 🎯 Product Strategy
- Product Overview: `2-product-foundation/2.1-product-overview.md`
- Product Backlog: `2-product-foundation/2.2-product-backlog/backlog.md`
- PRDs: `2-product-foundation/requirements/`

### 🏗️ Technical Architecture
- Infrastructure: `3-technical/3.1-system-foundation/infrastructure.md`
- System Design: `3-technical/3.1-system-foundation/design-standards/system-design.md`
- Domain Specs: `3-technical/3.1-system-foundation/architecture/domain-specs.md`
- API Contracts: `3-technical/3.1-system-foundation/architecture/api-contracts/openapi.yaml`
- Coding Standards: `3-technical/3.1-system-foundation/design-standards/coding-standards.md`

### 📅 Implementation Roadmap
- Plan Overview: `3-technical/3.2-implementation/plans/plan-overview.md`
- Detailed Plan: `3-technical/3.2-implementation/plans/plan.md`
- Progress: `3-technical/3.2-implementation/status/progress.md`

### 🚀 Product Delivery
- Product Delivery Plan: `2-product-foundation/product-delivery-plan.md` (comprehensive product-level plan)

### 📢 Marketing Strategy
- Go-to-Market: `4-marketing/go-to-market.md`
- Personas: `4-marketing/personas.md`

### 💰 Financial Strategy
- Financial Plans: `5-financing/plans.md`

### 📝 Decisions & Governance
- ADRs: `8-governance/decision-log.md`
- Changelog: `8-governance/changelog.md`
- Risk Register: `8-governance/risk-register.md`

---

## Document Status Summary

| Category | Documents | Status |
|----------|-----------|--------|
| Product Planning | 8 documents | ✅ Complete |
| Technical Planning | 5 documents | ✅ Complete |
| Implementation Planning | 4 documents | ✅ Complete |
| Marketing Planning | 3 documents | ✅ Complete |
| Financial Planning | 2 documents | ✅ Complete |
| ADRs | 2 ADRs | ✅ Complete |
| **Total** | **24+ documents** | **✅ All Complete** |

---

## How to Use This Index

1. **For Product Strategy:** Start with `2-product-foundation/2.1-product-overview.md`
2. **For Technical Architecture:** Start with `3-technical/3.1-system-foundation/infrastructure.md`
3. **For Implementation:** Start with `3-technical/3.2-implementation/plans/plan-overview.md`
4. **For Marketing:** Start with `4-marketing/go-to-market.md`
5. **For Financials:** Start with `5-financing/plans.md`

---

*This index is maintained to provide quick access to all planning documents. Update when new planning documents are created.*

