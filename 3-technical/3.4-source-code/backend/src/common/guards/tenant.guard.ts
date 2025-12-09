import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

/**
 * Multi-tenant guard that ensures requests are scoped to the user's tenant.
 * This guard should be used in combination with JwtAuthGuard.
 */
@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.tenantId) {
      throw new ForbiddenException('Tenant context required');
    }

    // Attach tenantId to request for use in services/repositories
    request.tenantId = user.tenantId;
    return true;
  }
}

