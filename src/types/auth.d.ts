export interface ILoginRequest {
  emailOrUsername: string;
  password: string;
  rememberMe?: boolean;
}

export interface ISwitchTenantRequest {
  tenantId: string;
}

export interface IRole {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

export interface ITenant {
  id: string;
  name: string;
  slug?: string;
  logo?: string;
}

export interface IUserTenant {
  tenant: ITenant;
  role: IRole;
  isActive: boolean;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken?: string;
    refreshToken?: string;
    user: IUser;
    tenant: ITenant;
    role: IRole;
    availableTenants: IUserTenant[];
    permissions: string[];
    redirectTo?: string;
  };
}
