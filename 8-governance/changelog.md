# Changelog

## Overview

This document provides a detailed changelog of all changes made to the project. All notable changes are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-09

### All MVP Epics Complete ✅

**Epic 1: Core Inventory Management** ✅
- Branch, Product, Inventory entities
- Import/Export request workflows
- Approval system
- Inventory viewing across locations

**Epic 2: Bill Creation & Payment** ✅
- Bill creation with products and services
- Payment processing (multiple methods)
- Bill status management

**Epic 3: Product & Service Management** ✅
- Service management (MALE/FEMALE/BOTH)
- Branch-specific pricing
- Commission split validation

**Epic 4: Promotion Engine** ✅
- 10 promotion types support
- Automatic promotion application
- Voucher management
- Usage tracking

**Epic 5: Customer Management & Loyalty** ✅
- Customer management with QR codes
- Points system (earning/redemption)
- Automatic membership tier assignment

**Epic 6: Multi-Location & Branch Management** ✅
- Branch management (from Epic 1)
- User-branch assignment

**Epic 7: Reporting & Analytics** ✅
- Revenue reporting
- Top products/services
- Logic-based recommendations
- Revenue trends

**Epic 8: Mobile App - Customer** ✅
- Mobile API endpoints
- Service browsing
- Customer QR lookup
- Points display

**Total:** 8/8 MVP epics complete, 100+ files created, 19 database migrations

---

## [1.0.0] - 2025-12-09

### Added
- **Complete Agent System (v3.0)**: All 13 agents fully documented with workflows, rules, and orchestration handoff
  - business-analyst, code-reviewer, creative-director, devops, docs-guardian
  - fullstack-engineer, graphics-designer, market-research, marketing-expert
  - product-strategist, system-architecture, ui-ux-designer, boost
- **Mode System**: Complete documentation for 4 modes (ideas, plan, execution, review)
- **IDE Setup Templates**: Cursor and VS Code configuration templates in `IDE-SETUP/`
  - Cursor commands: /ideas, /plan, /execution, /review
  - Cursor rules and settings templates
  - VS Code workspace settings template
- **Directory Structure**: Complete project structure with 0-8 top-level sections
- **Documentation**: Comprehensive README files, INDEX.md with full navigation

### Changed
- **Directory Renamed**: `3-technical/6-code/` → `3-technical/3.4-source-code/` for better structure consistency
  - Updated all references in documentation, agent files, and workflows
  - Follows numbering pattern: 3.1, 3.2, 3.3, 3.4
- **Agent Documentation**: Upgraded all agents to v3.0 with standardized format
  - Added Core Mission, Skills & Tools, Related Documents, Success Metrics
  - Standardized Orchestration Handoff format
  - Removed tech stack hardcoding, made generic and adaptable

### Fixed
- **Documentation Consistency**: All cross-references updated and validated
- **File Organization**: IDE setup files moved to `IDE-SETUP/` to avoid root clutter

## [Unreleased]

### Added - Sprint 1: Infrastructure & Authentication (2025-12-09)
- **Backend Infrastructure:**
  - NestJS project structure with TypeScript, ESLint, Prettier
  - Database configuration (TypeORM + PostgreSQL)
  - Environment configuration with .env.example
  - Project documentation (README.md)
- **Authentication Module:**
  - JWT authentication with refresh tokens
  - AuthService, AuthController with login, refresh, and me endpoints
  - JWT and Local Passport strategies
  - JwtAuthGuard for route protection
  - CurrentUser decorator
- **User Management Module:**
  - UserEntity with TypeORM
  - UsersService with CRUD operations
  - UsersController with user management endpoints
  - Password hashing with bcrypt
- **Multi-Tenant Support:**
  - TenantEntity, TenantsService, TenantsController
  - TenantGuard for multi-tenant isolation
  - TenantId decorator
- **Database:**
  - Database migrations (tenants, users tables)
  - Row-Level Security (RLS) setup for users table
  - TypeORM configuration
- **Testing:**
  - Unit tests for AuthService and UsersService
  - E2E tests for authentication endpoints
  - Jest configuration
- **CI/CD:**
  - GitHub Actions CI workflow (lint, typecheck, test, security)
  - Dependency review workflow
  - PR template with security checklist
- **Security:**
  - ESLint security plugins (eslint-plugin-security, eslint-plugin-sonarjs)
  - Input validation with class-validator
  - Security checklist in PR template

### Added
- **Complete Technical Planning Documentation:**
  - Infrastructure specification with tech stack (Next.js, NestJS, PostgreSQL, Redis, CouchDB, AWS)
  - Domain specifications using DDD (bounded contexts, entities, aggregates, events)
  - API contracts (OpenAPI 3.0 specification)
  - System design with C4 model diagrams
  - Coding standards for TypeScript, NestJS, React/Next.js
- **Product Planning:**
  - Product backlog with 8 epics and user stories (RICE prioritized)
  - Detailed implementation plan (14 sprints, 4 phases)
  - Product overview with vision, goals, and competitive advantages
- **Brand Guidelines:**
  - Complete brand foundation (brand story, tone of voice, color palette, typography, UI/UX mood, motion principles)
  - Brand consistency check completed
- **Architecture Decision Records:**
  - ADR-001: Brand Guidelines & Visual Identity System
  - ADR-002: Technology Stack Selection
- **Readiness Documentation:**
  - Readiness check for Execution & Code modes
  - Requirements directory structure created
- **Design System (Execution Mode):**
  - Complete design system with design tokens
  - Button components (primary, secondary, accent, destructive, ghost)
  - Form components (inputs, validation, Vietnamese formats)
  - Card components (standard, business-specific, recommendation cards)
  - Navigation components (sidebar, breadcrumbs, tabs, pagination)
  - All components follow brand guidelines and accessibility standards
- **Marketing Copy (Execution Mode):**
  - Landing page copy (homepage)
  - Social media copy (Facebook posts)
  - All copy in Vietnamese, simple language, benefit-focused
- **Social Media Creatives (Execution Mode):**
  - Creative specifications and guidelines
  - Templates for Facebook, Zalo, Instagram
  - Brand-aligned visual guidelines

### Changed
- **Product Overview:** Enhanced with brand promise, positioning, and competitive advantages
- **Personas:** Aligned with brand messaging and updated with target audience insights
- **Go-to-Market Plan:** Completed with market entry strategy and detailed channels
- **Financing Plan:** Completed with funding needs and projections
- **Implementation Progress:** Updated to reflect planning and execution progress

### Fixed
- Brand consistency issues between brand guidelines and product overview
- Mission statement alignment across documents
- Target audience messaging consistency

### Security
- *Security fix*

---

---

## [0.9.0] - 2025-XX-XX

### Added
- *Beta feature 1*
- *Beta feature 2*

### Changed
- *Change 1*

---

## [0.8.0] - 2025-XX-XX

### Added
- *Alpha feature 1*
- *Alpha feature 2*

## Change Categories

### Added
New features, capabilities, or functionality.

### Changed
Changes to existing functionality, behavior, or APIs.

### Deprecated
Features that are still available but will be removed in a future version.

### Removed
Features that have been removed in this version.

### Fixed
Bug fixes and error corrections.

### Security
Security-related fixes and improvements.

## Related Documents

- **[Project Versions](project-versions.md)** - Version milestones
- **[Decision Log](decision-log.md)** - Decisions leading to changes
- **[Implementation History](../3-technical/3.2-implementation/history/history.log.md)** - Technical implementation details

---

*Maintain this changelog for all releases to track project evolution.*

