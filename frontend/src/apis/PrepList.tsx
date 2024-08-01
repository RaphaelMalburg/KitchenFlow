import { PrepListDTO, PrepListItemDTO } from "@/models/Stations";
import axiosInstance from "@/services/axiosInstace";

import { toast } from "react-toastify";
const baseUrl = "https://kitchenflowapi.azurewebsites.net";

export const addPrepListAPI = async (prepList: PrepListDTO, idItemsList: number[], stationId: number) => {
  try {
    const data = await axiosInstance.post<PrepListDTO>(`${baseUrl}/api/PrepList/${stationId}`, {
      prepList,
      idItemsList,
    });
    toast.success("Prep List added successfully!");
    return data;
  } catch (err) {
    console.log(err);
    toast.error("Error adding Prep List");
  }
};

export const getAllPrepListAPI = async (stationId: number) => {
  try {
    const data = await axiosInstance.get<PrepListItemDTO[]>(`${baseUrl}/api/PrepList/${stationId}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deletePrepListAPI = async (prepListId: number) => {
  try {
    const data = await axiosInstance.delete<boolean>(`${baseUrl}/api/PrepList/${prepListId}`);
    toast.success("Prep List deleted successfully");
    return data;
  } catch (err) {
    console.log(err);
    toast.error("Error deleting the list");
  }
};
