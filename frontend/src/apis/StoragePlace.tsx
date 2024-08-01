import { StoragePlacesDTO } from "@/models/Stations";
import axiosInstance from "@/services/axiosInstace";

import { toast } from "react-toastify";
const baseUrl = "https://kitchenflowapi.azurewebsites.net";

export const getStoragePlaceAPI = async (stationId: number) => {
  try {
    const data = await axiosInstance.get<StoragePlacesDTO[]>(`${baseUrl}/api/StoragePlace/${stationId}/storageplaces`);
    return data.data;
  } catch (err) {
    console.log(err);
  }
};

export const addStoragePlaceAPI = async (stationId: number, name: string, description: string) => {
  try {
    const data = await axiosInstance.post<StoragePlacesDTO>(`${baseUrl}/api/StoragePlace/${stationId}/storageplaces`, {
      name,
      description,
    });
    toast.success("Storage Place saved successfully");
    return data.data;
  } catch (err) {
    toast.error("Storage Place save failed");
    console.log(err);
  }
};

export const updateStoragePlaceAPI = async (stationId: number, name: string, description: string) => {
  try {
    const data = await axiosInstance.patch<StoragePlacesDTO>(`${baseUrl}/api/StoragePlace/${stationId}`, { name, description });
    toast.success("Storage Place updated successfully");
    return data;
  } catch (err) {
    toast.error("Error updating storage place");
    console.log(err);
  }
};

export const deleteStoragePlaceAPI = async (stationId: number) => {
  try {
    const data = await axiosInstance.delete<StoragePlacesDTO>(`${baseUrl}/api/StoragePlace/${stationId}`);
    toast.success("Storage place successfully deleted");
    return data;
  } catch (err) {
    toast.error("Storage place failed to be deleted");
    console.log(err);
  }
};
