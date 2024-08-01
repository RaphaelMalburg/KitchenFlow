import { UnitOfMeasureDTO } from "@/models/Stations";
import axiosInstance from "@/services/axiosInstace";

import { toast } from "react-toastify";
const baseUrl = "https://kitchenflowapi.azurewebsites.net";

export const createUnitMeasureAPI = async (unitOfMeasure: UnitOfMeasureDTO) => {
  try {
    const data = await axiosInstance.post<UnitOfMeasureDTO>(`${baseUrl}/api/UnitMeasure`, {
      id: unitOfMeasure.id,
      name: unitOfMeasure.name,
    });
    toast.success("Unit measurement was successfully created");
    return data;
  } catch (e) {
    console.error(e);
    toast.error("Error creating unit measurement");
  }
};

export const getAllUnitMeasureAPI = async () => {
  try {
    const data = await axiosInstance.get<UnitOfMeasureDTO[]>(`${baseUrl}/api/UnitMeasure`);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const updateUnitMeasureAPI = async (unitOfMeasure: UnitOfMeasureDTO) => {
  try {
    const data = await axiosInstance.patch<UnitOfMeasureDTO>(`${baseUrl}/api/UnitMeasure`, {
      id: unitOfMeasure.id,
      name: unitOfMeasure.name,
    });
    toast.success("Updated measurement unit successfully");
    return data;
  } catch (e) {
    console.log(e);
    toast.error("Error updating measurement unit");
  }
};

export const deleteUnitMeasureAPI = async (unitOfMeasureId: number) => {
  try {
    const data = await axiosInstance.delete<UnitOfMeasureDTO>(`${baseUrl}/api/UnitMeasure/${unitOfMeasureId}`);
    toast.success("Unit of measure successfully deleted");
    return data;
  } catch (err) {
    toast.error("Unit of measure failed to be deleted");
    console.log(err);
  }
};
