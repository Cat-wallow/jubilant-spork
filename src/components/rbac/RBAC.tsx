'use client';

import { useAuth } from 'contexts/AuthContext';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface RBACProps {
  /**
   * The permission string required to render the children.
   * If not provided, the component will only check for authentication.
   */
  requiredPermission?: string;
  /**
   * The role(s) required to render the children.
   * Can be a single role string or an array of roles.
   */
  requiredRole?: string | string[];
  children: React.ReactNode;
  /**
   * If true, will redirect to /auth/sign-in if the user is not authenticated
   * or does not have the required permission.
   */
  redirect?: boolean;
}

/**
 * A component that conditionally renders its children based on
 * whether the current user has the required permission or is authenticated.
 * Can also handle redirection for protected pages.
 */
const RBAC: React.FC<RBACProps> = ({
  requiredPermission,
  requiredRole,
  children,
  redirect = false,
}) => {
  const { permissions, role, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Check permission
  const hasPermission = requiredPermission
    ? permissions.includes(requiredPermission)
    : true;

  // Check role
  const hasRole = requiredRole
    ? Array.isArray(requiredRole)
      ? requiredRole.includes(role || '')
      : role === requiredRole
    : true;

  // User must be authenticated and have both permission and role
  const hasAccess = isAuthenticated && hasPermission && hasRole;

  useEffect(() => {
    if (!isLoading && !hasAccess && redirect) {
      router.push('/auth/sign-in');
    }
  }, [isLoading, hasAccess, redirect, router]);

  // While loading, show a spinner to prevent content flash
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-brand-500 border-t-transparent"></div>
      </div>
    );
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  // If redirecting, return null while the redirect happens.
  // If not redirecting, return null to hide the content.
  return null;
};

export default RBAC;
