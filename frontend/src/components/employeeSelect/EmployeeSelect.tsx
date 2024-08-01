import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useEmployeStore from "@/store/useEmployeeStore";

export function EmployeeSelect() {
  const employees = useEmployeStore((state) => state.employees);
  const setCurrentEmployee = useEmployeStore((state) => state.setCurrentEmployee);

  const useCurrentEmployee = useEmployeStore((state) => state.currentEmployee);

  const handleEmployeeSelect = (value: string) => {
    const selectedEmployee = employees.find((employee) => employee.id === parseInt(value));
    if (selectedEmployee) {
      const newValue = {
        id: selectedEmployee.id,
        name: selectedEmployee.name,
        role: selectedEmployee.role,
      };
      setCurrentEmployee(newValue);
      window.location.reload();
    }
  };

  return (
    <Select onValueChange={handleEmployeeSelect}>
      <SelectTrigger className="md:w-[130px] w-24 ">
        <SelectValue placeholder={useCurrentEmployee ? useCurrentEmployee.name : "Select a Staff"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <SelectItem key={employee.id} value={employee.id.toString()}>
                {employee.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem value={"none"}>No employees</SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
