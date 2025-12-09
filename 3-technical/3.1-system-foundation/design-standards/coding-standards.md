# Coding Standards

**Last Updated:** 2025-12-09  
**Version:** 1.0

## Overview

This document defines coding standards and best practices for the Barbershop/Beauty Chain Management System to ensure consistency, maintainability, and code quality across the project.

## General Principles

### Code Organization
- **Modular Structure:** Organize code by feature/domain, not by type
- **Separation of Concerns:** Clear separation between presentation, business logic, and data access
- **DRY (Don't Repeat Yourself):** Avoid code duplication, extract common functionality
- **SOLID Principles:** Follow SOLID principles for object-oriented design
- **Clean Code:** Write code that is readable, self-documenting, and maintainable

### Naming Conventions

**Files and Directories:**
- **Kebab-case** for file and directory names: `user-service.ts`, `inventory-controller.ts`
- **PascalCase** for component files: `UserProfile.tsx`, `BillItem.tsx`
- **Descriptive names:** Names should clearly indicate purpose

**Variables and Functions:**
- **camelCase** for variables and functions: `getUserById`, `calculateTotal`
- **Descriptive names:** Avoid abbreviations, use full words
- **Boolean variables:** Prefix with `is`, `has`, `can`: `isActive`, `hasPermission`, `canEdit`

**Constants:**
- **UPPER_SNAKE_CASE** for constants: `MAX_RETRY_ATTEMPTS`, `DEFAULT_PAGE_SIZE`
- **PascalCase** for enum values: `PaymentStatus.Paid`, `BillStatus.Confirmed`

**Classes and Types:**
- **PascalCase** for classes, interfaces, types: `UserService`, `BillEntity`, `PaymentDto`
- **Suffix conventions:**
  - Entities: `*Entity` (e.g., `ProductEntity`)
  - DTOs: `*Dto` (e.g., `CreateBillDto`)
  - Services: `*Service` (e.g., `InventoryService`)
  - Controllers: `*Controller` (e.g., `BillController`)

## Language-Specific Standards

### TypeScript

**General:**
- **Strict Mode:** Always use TypeScript strict mode
- **Type Safety:** Avoid `any`, use proper types or `unknown`
- **Type Inference:** Use type inference where possible, explicit types where needed
- **Interfaces vs Types:** Prefer interfaces for object shapes, types for unions/intersections

**Code Style:**
```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

function getUserById(id: string): Promise<User> {
  // implementation
}

// Bad
function getUserById(id: any): any {
  // implementation
}
```

**Async/Await:**
- Prefer `async/await` over Promises
- Always handle errors with try/catch
- Use Promise.all for parallel operations

```typescript
// Good
async function fetchUserData(userId: string): Promise<User> {
  try {
    const user = await userRepository.findById(userId);
    return user;
  } catch (error) {
    logger.error('Failed to fetch user', { userId, error });
    throw new UserNotFoundException(userId);
  }
}

// Parallel operations
const [user, orders] = await Promise.all([
  userRepository.findById(userId),
  orderRepository.findByUserId(userId),
]);
```

### NestJS (Backend)

**Module Structure:**
- One module per feature/domain
- Export only public interfaces
- Use dependency injection

**Controller:**
```typescript
@Controller('bills')
@UseGuards(JwtAuthGuard, TenantGuard)
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new bill' })
  @ApiResponse({ status: 201, type: BillDto })
  async createBill(
    @Body() createBillDto: CreateBillDto,
    @CurrentUser() user: User,
  ): Promise<BillDto> {
    return this.billService.create(createBillDto, user.tenantId);
  }
}
```

**Service:**
```typescript
@Injectable()
export class BillService {
  constructor(
    private readonly billRepository: BillRepository,
    private readonly promotionService: PromotionService,
  ) {}

  async create(dto: CreateBillDto, tenantId: string): Promise<Bill> {
    // Business logic
  }
}
```

**Repository:**
```typescript
@Injectable()
export class BillRepository {
  constructor(
    @InjectRepository(BillEntity)
    private readonly repository: Repository<BillEntity>,
  ) {}

  async findByTenantId(tenantId: string): Promise<BillEntity[]> {
    return this.repository.find({
      where: { tenantId },
      relations: ['items', 'payments'],
    });
  }
}
```

### React/Next.js (Frontend)

**Component Structure:**
```typescript
// Component file structure
interface UserProfileProps {
  userId: string;
}

export function UserProfile({ userId }: UserProfileProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="user-profile">
      <h1>{data.name}</h1>
      {/* ... */}
    </div>
  );
}
```

**Hooks:**
- Custom hooks for reusable logic
- Prefix with `use`: `useBill`, `useInventory`
- Return objects, not arrays (for named destructuring)

```typescript
// Good
export function useBill(billId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['bill', billId],
    queryFn: () => fetchBill(billId),
  });

  return { bill: data, isLoading, error };
}

// Usage
const { bill, isLoading } = useBill(billId);
```

**State Management:**
- Use React Query for server state
- Use Zustand for client state
- Avoid prop drilling, use context when needed

### React Native (Mobile)

**Component Structure:**
- Similar to React web components
- Use React Native components: `View`, `Text`, `TouchableOpacity`
- Platform-specific code: `Platform.OS === 'ios'`

**Navigation:**
- Use React Navigation
- Type-safe navigation with TypeScript

**Offline Support:**
- Use AsyncStorage for local storage
- Use SQLite for complex queries
- Implement sync logic with CouchDB

## Code Review Guidelines

### Review Checklist

**Functionality:**
- [ ] Code works as intended
- [ ] Edge cases are handled
- [ ] Error handling is appropriate
- [ ] No hardcoded values (use constants/config)

**Code Quality:**
- [ ] Follows coding standards
- [ ] No code duplication
- [ ] Functions are small and focused
- [ ] Variable names are descriptive

**Testing:**
- [ ] Unit tests for business logic
- [ ] Integration tests for API endpoints
- [ ] Test coverage ≥ 80%
- [ ] Tests are meaningful and maintainable

**Security:**
- [ ] Input validation
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention
- [ ] Authentication/authorization checks
- [ ] Tenant isolation enforced

**Performance:**
- [ ] No N+1 queries
- [ ] Appropriate use of caching
- [ ] Efficient algorithms
- [ ] Database indexes where needed

### Required Approvals
- **Backend Changes:** At least 1 backend developer approval
- **Frontend Changes:** At least 1 frontend developer approval
- **Database Changes:** Database migration review required
- **Security Changes:** Security review required
- **Breaking Changes:** Team lead approval required

### Automated Checks
- **Linting:** ESLint for TypeScript/JavaScript
- **Formatting:** Prettier for code formatting
- **Type Checking:** TypeScript compiler
- **Tests:** Jest/Vitest for unit tests
- **E2E Tests:** Playwright/Cypress for end-to-end tests

## Testing Standards

### Test Coverage Requirements
- **Minimum:** 80% code coverage
- **Critical Paths:** 100% coverage (authentication, payments, inventory)
- **Business Logic:** 100% coverage for domain services

### Testing Frameworks
- **Unit Tests:** Jest/Vitest
- **Integration Tests:** Jest + Supertest (API)
- **E2E Tests:** Playwright (web), Detox (mobile)
- **Component Tests:** React Testing Library

### Test Organization
```
tests/
├── unit/
│   ├── services/
│   ├── repositories/
│   └── utils/
├── integration/
│   ├── api/
│   └── database/
└── e2e/
    ├── web/
    └── mobile/
```

### Test Naming
```typescript
describe('BillService', () => {
  describe('create', () => {
    it('should create a bill with valid data', async () => {
      // test
    });

    it('should throw error when customer not found', async () => {
      // test
    });
  });
});
```

## Documentation Standards

### Code Documentation

**JSDoc Comments:**
```typescript
/**
 * Creates a new bill for a customer.
 * 
 * @param dto - Bill creation data
 * @param tenantId - Tenant ID for multi-tenant isolation
 * @returns Created bill entity
 * @throws {CustomerNotFoundException} When customer not found
 * @throws {ValidationException} When bill data is invalid
 */
async create(dto: CreateBillDto, tenantId: string): Promise<Bill> {
  // implementation
}
```

**Inline Comments:**
- Explain "why", not "what"
- Avoid obvious comments
- Use comments for complex business logic

### API Documentation
- **OpenAPI/Swagger:** All API endpoints documented
- **Request/Response Examples:** Include examples
- **Error Responses:** Document all error cases

### README Requirements
- **Project Setup:** Installation and setup instructions
- **Development:** How to run locally
- **Testing:** How to run tests
- **Deployment:** Deployment instructions
- **Architecture:** High-level architecture overview

## Git & Version Control

### Branch Naming
- **Feature:** `feature/bill-offline-mode`
- **Bugfix:** `bugfix/inventory-calculation-error`
- **Hotfix:** `hotfix/payment-gateway-timeout`
- **Release:** `release/v1.0.0`

### Commit Messages
- **Format:** `type(scope): description`
- **Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- **Examples:**
  - `feat(billing): add offline bill creation`
  - `fix(inventory): correct quantity calculation`
  - `refactor(auth): simplify JWT validation`

### Pull Request Guidelines
- **Title:** Clear, descriptive title
- **Description:** What, why, how
- **Linked Issues:** Reference related issues
- **Screenshots:** For UI changes
- **Testing:** Describe testing done

## Performance Standards

### Backend Performance
- **API Response Time:** < 200ms (p95)
- **Database Queries:** < 100ms (p95)
- **Background Jobs:** Process within SLA
- **Concurrent Requests:** Support 1000+ concurrent users

### Frontend Performance
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Lighthouse Score:** ≥ 90
- **Bundle Size:** < 500KB (initial load)

### Database Performance
- **Query Time:** < 100ms (p95)
- **Index Coverage:** All frequently queried columns indexed
- **Connection Pooling:** Properly configured
- **Read Replicas:** For read-heavy operations

## Security Standards

### Input Validation
- **All Inputs:** Validate and sanitize
- **Type Validation:** Use Zod/class-validator
- **SQL Injection:** Parameterized queries only
- **XSS Prevention:** Sanitize user input, use CSP

### Authentication & Authorization
- **JWT Tokens:** Secure token storage
- **Refresh Tokens:** Rotate refresh tokens
- **RBAC:** Role-based access control
- **Tenant Isolation:** Enforce at all layers

### Data Protection
- **Encryption:** At rest and in transit
- **Secrets:** Use secrets manager (AWS Secrets Manager)
- **PII:** Handle personal data according to regulations
- **Audit Logging:** Log all sensitive operations

## Related Documents

- **[System Design](system-design.md)** - Overall system design principles
- **[Infrastructure](../infrastructure.md)** - Infrastructure and deployment
- **[Implementation](../../3.2-implementation/README.md)** - Implementation practices

---

*Keep these standards updated as the project evolves and new best practices emerge.*
