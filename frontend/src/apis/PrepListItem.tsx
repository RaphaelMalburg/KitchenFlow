import { PrepListItemDTO } from "@/models/Stations";
import axiosInstance from "@/services/axiosInstace";

import { toast } from "react-toastify";
const baseUrl = "https://kitchenflowapi.azurewebsites.net";

export const getAllPrepListItems = async (stationId: number) => {
  try {
    const data = await axiosInstance.get<PrepListItemDTO[]>(`${baseUrl}/api/PrepListItem/${stationId}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const createPrepListItem = async (prepListItem: PrepListItemDTO, stationId: number) => {
  try {
    const data = await axiosInstance.post<PrepListItemDTO>(`${baseUrl}/api/PrepListItem/${stationId}`, prepListItem);
    toast.success("Successfully added prep list item");
    return data;
  } catch (err) {
    console.log(err);
    toast.error("Error adding prep list item: " + err);
  }
};

export const updatePrepListItem = async (array: string[]) => {
  try {
    const data = await axiosInstance.patch<PrepListItemDTO>(`${baseUrl}/api/PrepListItem/prepListItemsCheck`, {
      array,
    });
    toast.success("Successfully updated prep list items");
    return data;
  } catch (err) {
    console.log(err);
    toast.error("Error updating prep list item: " + err);
  }
};

export const deletePrepListItemAPI = async (prepListItemeId: number) => {
  try {
    const data = await axiosInstance.delete<PrepListItemDTO>(`${baseUrl}/api/PrepListItem/${prepListItemeId}`);
    toast.success("Prep list item successfully deleted");
    return data;
  } catch (err) {
    toast.error("Prep list item failed to be deleted");
    console.log(err);
  }
};

export const updatePrepListItemAPI = async (prepListItem: PrepListItemDTO) => {
  try {
    const data = await axiosInstance.patch<PrepListItemDTO>(`${baseUrl}/api/PrepListItem`, prepListItem);
    toast.success("Successfully updated prep list item");
    return data;
  } catch (e) {
    console.log(e);
    toast.error("Error updating prep list item");
  }
};
