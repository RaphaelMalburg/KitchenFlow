export interface UserDTO {
  email: string;
  password: string;
  token?: string | null;
}

export interface UserBioDTO {
  email: string;
  firstName: string;
  lastName: string;
  token?: string | null;
  companyName: string;
  isActive: boolean | null;
}

export interface UserPasswordDTO {
  oldPassword: string;
  newPassword: string;
}

export interface UserProfileTokenDTO {
  email: string;
  password: string;
  rememberMe: boolean;
  token: string;
}

export interface UserContactEmailDTO {
  email: string;
  name: string;
  message: string;
}
