import { UserContactEmailDTO, UserDTO, UserPasswordDTO } from "@/models/User";
import { UserBioDTO } from "@/models/User";
import useAuthStore from "@/store/useAuthStore";

import { toast } from "react-toastify";
import axiosInstance from "@/services/axiosInstace";
const baseUrl = "https://kitchenflowapi.azurewebsites.net";

export const loginAPI = async (user: UserDTO) => {
  try {
    const data = await axiosInstance.post<UserDTO>(`${baseUrl}/api/Account/login`, {
      email: user.email,
      password: user.password,
    });
    toast.success("Login successful");
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.response && e.response.data) {
      const errorMessage = e.response.data;

      if (errorMessage === "Please confirm your account") {
        toast.error("Please confirm your account before logging in");
      } else if (e.response.data.errors) {
        const errors = e.response.data.errors;
        if (errors.Email && errors.Password) {
          toast.error("Email and/or password is incorrect. Please try again.");
        }
      }
    } else {
      toast.error("An unexpected error occurred. Please try again later.");
    }
    console.log(e);
  }
};

export const registerAPI = async (email: string, password: string) => {
  try {
    const data = await axiosInstance.post<UserDTO>(`${baseUrl}/api/Account/register`, {
      email: email,
      password: password,
    });
    toast.success("Registration successful");
    return data;
  } catch (e) {
    toast.error("Registration failed. Please try again.");
    console.log(e);
  }
};

export const createBioAPI = async (firstName: string, lastName: string, companyName: string) => {
  try {
    const data = await axiosInstance.post<UserBioDTO>(`${baseUrl}/api/Account`, {
      email: "",
      firstName: firstName,
      lastName: lastName,
      companyName: companyName,
      isActive: true,
    });
    toast.success("Bio creation successful");
    return data;
  } catch (e) {
    toast.error("Bio creation failed. Please try again.");
    console.log(e);
  }
};

export const logoutAPI = async () => {
  try {
    await axiosInstance.post(`${baseUrl}/api/Account/logout`);
    useAuthStore.setState({ authorized: false });
    toast.success("Logout successful");
  } catch (e) {
    toast.error("Logout failed. Please try again.");
    console.log(e);
  }
};

export const getBioAPI = async () => {
  try {
    const data = await axiosInstance.get<UserBioDTO>(`${baseUrl}/api/getBio`);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const changePasswordAPI = async (oldPassword: string, newPassword: string) => {
  try {
    const data = await axiosInstance.post<UserPasswordDTO>(`${baseUrl}/api/changePassword`, {
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
    toast.success("Password changed successfully");
    return data;
  } catch (e) {
    toast.error("Password change failed. Please try again.");
    console.log(e);
  }
};

export const deleteUserAPI = async () => {
  try {
    await axiosInstance.delete<void>(`${baseUrl}/api/deleteuser`);
    toast.success("User deleted successfully");
  } catch (e) {
    toast.error("User deletion failed. Please try again.");
    console.log(e);
  }
};

export const sendEmailContacts = async (email: UserContactEmailDTO) => {
  try {
    await axiosInstance.post<void>(`${baseUrl}/api/Account/contact`, {
      email: email.email,
      name: email.name,
      message: email.message,
    });
    toast.success("Email sent successfully");
  } catch (e) {
    toast.error("Email sending failed. Please try again.");
    console.log(e);
  }
};
