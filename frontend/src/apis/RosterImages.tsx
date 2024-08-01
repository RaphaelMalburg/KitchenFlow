import { ImageDTO } from "@/models/ImageDTO";
import axiosInstance from "@/services/axiosInstace";

import { toast } from "react-toastify";
const baseUrl = "https://kitchenflowapi.azurewebsites.net";

export const uploadImageAPI = async (formData: FormData): Promise<ImageDTO | undefined> => {
  try {
    const response = await axiosInstance.post<ImageDTO>(`${baseUrl}/api/Account/upload`, formData);
    toast.success("Image uploaded successfully");
    return response.data;
  } catch (error) {
    toast.error("Error uploading image");
    console.error(error);
  }
};

export const getAllImagesAPI = async (): Promise<ImageDTO[] | undefined> => {
  try {
    const response = await axiosInstance.get<ImageDTO[]>(`${baseUrl}/api/Account/all`);
    return response.data;
  } catch (error) {
    toast.error("Error fetching images");
    console.error(error);
  }
};

export const getImageByIdAPI = async (fileName: string): Promise<ImageDTO | undefined> => {
  try {
    const response = await axiosInstance.get<ImageDTO>(`${baseUrl}/api/Account/${fileName}`);
    return response.data;
  } catch (error) {
    toast.error("Error fetching image");
    console.error(error);
  }
};

export const deleteImageAPI = async (fileName: string): Promise<void> => {
  try {
    await axiosInstance.post(`${baseUrl}/api/Account/deleteimage`, {
      fileName,
    });
    toast.success("Image deleted successfully");
  } catch (error) {
    toast.error("Error deleting image");
    console.error(error);
  }
};
