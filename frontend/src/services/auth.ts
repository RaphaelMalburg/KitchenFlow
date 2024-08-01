import { jwtDecode } from "jwt-decode";
import useAuthStore from "@/store/useAuthStore";

interface DecodedToken {
  exp: number; // Expiration time
  userId: string; // Custom claim for user ID
  userName: string; // Custom claim for user name
  email: string; // Custom claim for user email
  // Add other claims as necessary
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp }: DecodedToken = jwtDecode<DecodedToken>(token);
    if (Date.now() >= exp * 1000) {
      return true;
    }
    return false;
  } catch (error) {
    return true; // If there's an error decoding the token, consider it expired
  }
};

export const handleTokenExpiration = (): boolean => {
  const { logout, token } = useAuthStore.getState();
  if (isTokenExpired(token)) {
    logout();
    if (window.location.pathname !== "/") {
      window.location.href = "/"; // Redirect to root if not already there
    }
    return true;
  }
  return false;
};
