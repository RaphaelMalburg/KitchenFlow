import { StationDTO } from "@/models/Stations";
import axiosInstance from "@/services/axiosInstace";

import { toast } from "react-toastify";
const baseUrl = "https://kitchenflowapi.azurewebsites.net";

export const getStation = async () => {
  try {
    const data = await axiosInstance.get<StationDTO[]>(`${baseUrl}/api/Station`);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const addStationAPI = async (name: string) => {
  try {
    const data = await axiosInstance.post<string>(`${baseUrl}/api/Station`, {
      name,
    });
    toast.success(name + " added successfully to the station list");
    return data;
  } catch (e) {
    toast.error(name + " failed to add station to the station list");
    console.log(e);
  }
};

export const updateStationAPI = async (id: string, name: string) => {
  try {
    const idnumber = parseInt(id);
    const data = await axiosInstance.patch<string>(`${baseUrl}/api/Station/${idnumber}`, {
      name,
    });
    toast.success("Station name updated successfully");
    return data;
  } catch (err) {
    console.log(err);
    toast.error("Error updating station");
  }
};

export const deleteStation = async (id: number) => {
  try {
    const data = await axiosInstance.delete<unknown>(`${baseUrl}/api/Station/${id}`);
    toast.success("Station deleted successfully");
    return data;
  } catch (err) {
    toast.error("Error deleting station");
    console.log(err);
  }
};
