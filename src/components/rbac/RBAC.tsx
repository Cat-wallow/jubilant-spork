'use client';

import { useAuth } from '@/contexts/AuthContext';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UnauthorizedPage from '@/components/auth/UnauthorizedPage';

interface RBACProps {
  /**
   * The permission string or an array of permission strings required to render the children.
   * If not provided, the component will only check for authentication.
   */
  requiredPermission?: string | string[];
  /**
   * The role(s) required to render the children.
   * Can be a single role string or an array of roles.
   */
  requiredRole?: string | string[];
  children: React.ReactNode;
  /**
   * If true, will redirect the user to the previous page if they don't have access.
   */
  redirect?: boolean;
  /**
   * If true, will render a dedicated "Unauthorized" page if the user doesn't have access.
   * This takes precedence over `redirect`.
   */
  unauthorizedPage?: boolean;
}

/**
 * A component that conditionally renders its children based on
 * whether the current user has the required permission or is authenticated.
 * Can also handle redirection or show an unauthorized page.
 */
const RBAC: React.FC<RBACProps> = ({
  requiredPermission,
  requiredRole,
  children,
  redirect = false,
  unauthorizedPage = false,
}) => {
  const { permissions, isAuthenticated, currentRole, isLoading } = useAuth();
  const router = useRouter();

  // Check permission
  const hasPermission = requiredPermission
    ? Array.isArray(requiredPermission)
      ? requiredPermission.some(perm => permissions.includes(perm))
      : permissions.includes(requiredPermission)
    : true;

  // Check role
  const hasRole = requiredRole
    ? Array.isArray(requiredRole)
      ? requiredRole.includes(currentRole?.name || '')
      : currentRole?.name === requiredRole
    : true;

  // User must be authenticated and have both permission and role
  const hasAccess = isAuthenticated && hasPermission && hasRole;

  useEffect(() => {
    // If auth state is still loading, do nothing.
    if (isLoading) return;

    // If user is not authenticated, always redirect to sign-in.
    if (!isAuthenticated) {
      router.push('/auth/sign-in');
      return;
    }

    // If user is authenticated but lacks permission/role, handle redirection.
    if (!hasAccess && redirect && !unauthorizedPage) {
      router.back();
    }
  }, [
    isLoading,
    isAuthenticated,
    hasAccess,
    redirect,
    unauthorizedPage,
    router,
  ]);

  // While loading authentication state, don't render anything to prevent flashes
  if (isLoading) {
    return null;
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  // If access is denied, decide what to show.
  if (unauthorizedPage) {
    return <UnauthorizedPage />;
  }

  // If redirecting, return null while the redirect happens.
  // Otherwise, return null to hide the content.
  return null;
};

export default RBAC;
