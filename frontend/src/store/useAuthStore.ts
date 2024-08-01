import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserBioDTO } from "@/models/User";
import { getBioAPI } from "../apis/User";

type AuthStore = {
  authorized: boolean;
  user: UserBioDTO;
  token: string;
  setAuthorized: (authorized: boolean) => void;
  setUserAsync: (user: UserBioDTO) => Promise<void>;
  logout: () => void;
  setToken: (tokenString: string) => void;
};

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      authorized: false,
      token: "",
      user: { email: "", firstName: "", lastName: "", companyName: "", isActive: null, token: "" },
      setAuthorized: (authorized: boolean) => set({ authorized }),
      logout: () => set({ authorized: false, user: { email: "", firstName: "", lastName: "", companyName: "", token: "", isActive: null } }),
      setUserAsync: async (user: UserBioDTO) => {
        await getBioAPI();
        set({ user });
      },
      setToken: (tokenString) => set({ token: tokenString }),
    }),
    {
      name: "auth-storage", // Name for local storage key
    }
  )
);

export default useAuthStore;
