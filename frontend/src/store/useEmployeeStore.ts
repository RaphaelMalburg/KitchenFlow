import { EmployeeDTO } from "@/models/Employee";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type EmployeeStore = {
  employees: EmployeeDTO[];
  currentEmployee: EmployeeDTO;
  setEmployees: (employees: EmployeeDTO[]) => void;
  setCurrentEmployee: (currentEmployee: EmployeeDTO) => void;
};

const useEmployeStore = create(
  persist<EmployeeStore>(
    (set) => ({
      employees: [],
      currentEmployee: { name: "", role: "", id: 0 },
      setEmployees: async (employees) => {
        set({ employees });
      },
      setCurrentEmployee: async (currentEmployee) => {
        set({ currentEmployee });
      },
    }),
    {
      name: "employee-storage",
    }
  )
);

export default useEmployeStore;
