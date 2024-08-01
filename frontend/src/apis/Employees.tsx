import { EmployeeDTO } from "@/models/Employee";
import axiosInstance from "@/services/axiosInstace";

import { toast } from "react-toastify";

const baseUrl = "https://kitchenflowapi.azurewebsites.net";

export const createEmployeeAPI = async (name: string, role: string) => {
  try {
    const data = await axiosInstance.post<EmployeeDTO>(`${baseUrl}/api/employees/createemployee`, {
      name,
      role,
    });
    toast.success("Employee created successfully");
    return data;
  } catch (err) {
    toast.error("Error creating employee");
    console.log(err);
  }
};

export const getAllEmployeesAPI = async () => {
  try {
    const data = await axiosInstance.get<EmployeeDTO[]>(`${baseUrl}/api/employees/getallemployees`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteEmployeeAPI = async (id: number) => {
  try {
    const data = await axiosInstance.delete<unknown>(`${baseUrl}/api/employees/${id}`);
    toast.success("Employee deleted successfully");
    return data;
  } catch (err) {
    console.log(err);
    toast.error("Error deleting employee");
  }
};
