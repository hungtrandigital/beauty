# Technical Specifications: Role Permissions Revision

**Last Updated:** 2025-12-09  
**Version:** 1.0

## Overview

This document defines the technical implementation requirements for the revised permission system, including backend changes, frontend changes, database migrations, and API updates.

## Backend Implementation

### 1. Permission Constants

**File:** `backend/src/common/permissions/permissions.constants.ts`

```typescript
export const PERMISSIONS = {
  // BILLS
  BILLS_CREATE: 'bills.create',
  BILLS_UPDATE: 'bills.update',
  BILLS_VIEW: 'bills.view',
  BILLS_VIEW_ALL: 'bills.view.all',
  BILLS_DELETE: 'bills.delete',
  BILLS_PRINT: 'bills.print',
  BILLS_APPROVE: 'bills.approve',
  
  // PAYMENTS
  PAYMENTS_PROCESS: 'payments.process',
  PAYMENTS_VIEW: 'payments.view',
  PAYMENTS_REFUND: 'payments.refund',
  PAYMENTS_APPROVE: 'payments.approve',
  
  // CUSTOMERS
  CUSTOMERS_CREATE: 'customers.create',
  CUSTOMERS_VIEW: 'customers.view',
  CUSTOMERS_UPDATE: 'customers.update',
  CUSTOMERS_DELETE: 'customers.delete',
  CUSTOMERS_SEARCH: 'customers.search',
  
  // INVENTORY
  INVENTORY_VIEW: 'inventory.view',
  INVENTORY_VIEW_OWN: 'inventory.view.own',
  INVENTORY_MANAGE: 'inventory.manage',
  INVENTORY_APPROVE: 'inventory.approve',
  INVENTORY_ADJUST: 'inventory.adjust',
  INVENTORY_VIEW_HISTORY: 'inventory.view.history',
  INVENTORY_DELETE: 'inventory.delete',
  
  // PRODUCTS
  PRODUCTS_VIEW: 'products.view',
  PRODUCTS_CREATE: 'products.create',
  PRODUCTS_UPDATE: 'products.update',
  PRODUCTS_DELETE: 'products.delete',
  PRODUCTS_VIEW_DETAILS: 'products.view.details',
  
  // SERVICES
  SERVICES_VIEW: 'services.view',
  SERVICES_CREATE: 'services.create',
  SERVICES_UPDATE: 'services.update',
  SERVICES_DELETE: 'services.delete',
  SERVICES_TRACK: 'services.track',
  
  // PROMOTIONS
  PROMOTIONS_VIEW: 'promotions.view',
  PROMOTIONS_CREATE: 'promotions.create',
  PROMOTIONS_UPDATE: 'promotions.update',
  PROMOTIONS_DELETE: 'promotions.delete',
  PROMOTIONS_APPLY: 'promotions.apply',
  
  // REPORTS
  REPORTS_VIEW: 'reports.view',
  REPORTS_VIEW_OWN: 'reports.view.own',
  REPORTS_VIEW_ALL: 'reports.view.all',
  REPORTS_VIEW_SALES: 'reports.view.sales',
  REPORTS_VIEW_INVENTORY: 'reports.view.inventory',
  REPORTS_VIEW_STAFF: 'reports.view.staff',
  REPORTS_EXPORT: 'reports.export',
  
  // BRANCHES
  BRANCHES_VIEW: 'branches.view',
  BRANCHES_VIEW_OWN: 'branches.view.own',
  BRANCHES_MANAGE: 'branches.manage',
  BRANCHES_MANAGE_OWN: 'branches.manage.own',
  BRANCHES_VIEW_INVENTORY: 'branches.view.inventory',
  
  // USERS
  USERS_CREATE: 'users.create',
  USERS_VIEW: 'users.view',
  USERS_UPDATE: 'users.update',
  USERS_DELETE: 'users.delete',
  USERS_VIEW_OWN: 'users.view.own',
  
  // SETTINGS
  SETTINGS_VIEW: 'settings.view',
  SETTINGS_MANAGE: 'settings.manage',
  SETTINGS_MANAGE_OWN: 'settings.manage.own',
  
  // REQUESTS
  REQUESTS_CREATE: 'requests.create',
  REQUESTS_VIEW: 'requests.view',
  REQUESTS_VIEW_OWN: 'requests.view.own',
  REQUESTS_APPROVE: 'requests.approve',
  REQUESTS_CANCEL: 'requests.cancel',
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

export const PERMISSION_CATEGORIES = {
  BILLS: 'BILLS',
  PAYMENTS: 'PAYMENTS',
  CUSTOMERS: 'CUSTOMERS',
  INVENTORY: 'INVENTORY',
  PRODUCTS: 'PRODUCTS',
  SERVICES: 'SERVICES',
  PROMOTIONS: 'PROMOTIONS',
  REPORTS: 'REPORTS',
  BRANCHES: 'BRANCHES',
  USERS: 'USERS',
  SETTINGS: 'SETTINGS',
  REQUESTS: 'REQUESTS',
} as const;
```

### 2. Permission Guard

**File:** `backend/src/common/guards/permission.guard.ts`

```typescript
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const userPermissions = await this.usersService.getUserPermissions(user.id);
    
    return requiredPermissions.some(permission => 
      userPermissions.includes(permission)
    );
  }
}
```

### 3. Permission Decorator

**File:** `backend/src/common/decorators/permissions.decorator.ts`

```typescript
import { SetMetadata } from '@nestjs/common';
import { Permission } from '../permissions/permissions.constants';

export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
```

### 4. Default Role Permissions

**File:** `backend/src/admin/constants/default-roles.ts`

```typescript
import { PERMISSIONS } from '../../common/permissions/permissions.constants';

export const DEFAULT_CASHIER_PERMISSIONS = [
  // Bills
  PERMISSIONS.BILLS_CREATE,
  PERMISSIONS.BILLS_UPDATE,
  PERMISSIONS.BILLS_VIEW,
  PERMISSIONS.BILLS_DELETE,
  PERMISSIONS.BILLS_PRINT,
  
  // Payments
  PERMISSIONS.PAYMENTS_PROCESS,
  PERMISSIONS.PAYMENTS_VIEW,
  
  // Customers
  PERMISSIONS.CUSTOMERS_CREATE,
  PERMISSIONS.CUSTOMERS_VIEW,
  PERMISSIONS.CUSTOMERS_UPDATE,
  PERMISSIONS.CUSTOMERS_SEARCH,
  
  // Promotions
  PERMISSIONS.PROMOTIONS_VIEW,
  PERMISSIONS.PROMOTIONS_APPLY,
  
  // Products & Services
  PERMISSIONS.PRODUCTS_VIEW,
  PERMISSIONS.SERVICES_VIEW,
  
  // Reports
  PERMISSIONS.REPORTS_VIEW_OWN,
  
  // Inventory
  PERMISSIONS.INVENTORY_VIEW_OWN,
  
  // Branches
  PERMISSIONS.BRANCHES_VIEW_OWN,
] as const;

export const DEFAULT_WAREHOUSE_MANAGER_PERMISSIONS = [
  // Inventory
  PERMISSIONS.INVENTORY_VIEW,
  PERMISSIONS.INVENTORY_MANAGE,
  PERMISSIONS.INVENTORY_VIEW_HISTORY,
  PERMISSIONS.INVENTORY_ADJUST,
  
  // Products
  PERMISSIONS.PRODUCTS_VIEW,
  PERMISSIONS.PRODUCTS_VIEW_DETAILS,
  
  // Branches
  PERMISSIONS.BRANCHES_VIEW,
  PERMISSIONS.BRANCHES_VIEW_INVENTORY,
  
  // Reports
  PERMISSIONS.REPORTS_VIEW_INVENTORY,
  
  // Requests
  PERMISSIONS.REQUESTS_CREATE,
  PERMISSIONS.REQUESTS_VIEW_OWN,
  PERMISSIONS.REQUESTS_CANCEL,
] as const;
```

### 5. Database Migration

**File:** `db/migrations/XXX-update-default-role-permissions.ts`

```typescript
export class UpdateDefaultRolePermissions implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Update CASHIER role permissions
    await queryRunner.query(`
      UPDATE roles 
      SET permissions = $1
      WHERE name = 'CASHIER' AND "isSystem" = true
    `, [JSON.stringify(DEFAULT_CASHIER_PERMISSIONS)]);
    
    // Update WAREHOUSE_MANAGER role permissions
    await queryRunner.query(`
      UPDATE roles 
      SET permissions = $1
      WHERE name = 'WAREHOUSE_MANAGER' AND "isSystem" = true
    `, [JSON.stringify(DEFAULT_WAREHOUSE_MANAGER_PERMISSIONS)]);
  }
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert to old permissions if needed
  }
}
```

### 6. API Updates

**Update Admin Controller:**

```typescript
@Get('permissions')
@ApiOperation({ summary: 'Get all available permissions' })
async getPermissions() {
  return {
    permissions: Object.values(PERMISSIONS).map(permission => ({
      id: permission,
      name: this.getPermissionName(permission),
      category: this.getPermissionCategory(permission),
      description: this.getPermissionDescription(permission),
    })),
    categories: PERMISSION_CATEGORIES,
  };
}
```

**Add User Permissions Endpoint:**

```typescript
@Get('users/me/permissions')
@UseGuards(JwtAuthGuard, TenantGuard)
async getMyPermissions(@Request() req) {
  const user = req.user;
  const permissions = await this.usersService.getUserPermissions(user.id);
  return { permissions };
}
```

## Frontend Implementation

### 1. Permission Service

**File:** `frontend/src/services/permissions.service.ts`

```typescript
export class PermissionsService {
  private permissions: string[] = [];
  
  async loadPermissions(): Promise<void> {
    const response = await api.get('/users/me/permissions');
    this.permissions = response.data.permissions;
  }
  
  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }
  
  hasAnyPermission(permissions: string[]): boolean {
    return permissions.some(p => this.hasPermission(p));
  }
  
  hasAllPermissions(permissions: string[]): boolean {
    return permissions.every(p => this.hasPermission(p));
  }
}
```

### 2. Permission Guard (Route)

**File:** `frontend/src/guards/permission.guard.ts`

```typescript
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private permissionsService: PermissionsService) {}
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredPermissions = route.data['permissions'] as string[];
    if (!requiredPermissions) return true;
    
    return this.permissionsService.hasAnyPermission(requiredPermissions);
  }
}
```

### 3. Permission Directive

**File:** `frontend/src/directives/has-permission.directive.ts`

```typescript
@Directive({
  selector: '[hasPermission]',
})
export class HasPermissionDirective {
  @Input() hasPermission: string | string[];
  
  constructor(
    private el: ElementRef,
    private permissionsService: PermissionsService,
  ) {}
  
  ngOnInit() {
    const permissions = Array.isArray(this.hasPermission) 
      ? this.hasPermission 
      : [this.hasPermission];
    
    if (!this.permissionsService.hasAnyPermission(permissions)) {
      this.el.nativeElement.style.display = 'none';
    }
  }
}
```

### 4. Permission-Based UI

**Example Usage:**

```tsx
// Hide/show based on permission
{permissionsService.hasPermission('bills.create') && (
  <Button onClick={createBill}>Tạo hóa đơn</Button>
)}

// Disable based on permission
<Button 
  disabled={!permissionsService.hasPermission('bills.update')}
  onClick={updateBill}
>
  Cập nhật
</Button>

// Using directive
<button hasPermission="bills.delete">Xóa</button>
```

## Testing Requirements

### Backend Tests

- Permission guard tests
- Permission validation tests
- Default role permission tests
- Migration tests

### Frontend Tests

- Permission service tests
- Permission guard tests
- Permission directive tests
- UI visibility tests

## Performance Considerations

- Cache user permissions in memory
- Permission checks should be < 10ms
- Lazy load permission data
- Optimize permission queries

## Security Considerations

- Never trust frontend permission checks (backend must validate)
- Log all permission denials
- Audit permission changes
- Rate limit permission checks if needed

---

*This technical spec defines the implementation requirements for the revised permission system.*
