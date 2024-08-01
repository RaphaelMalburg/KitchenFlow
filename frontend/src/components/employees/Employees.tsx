import useEmployeStore from "@/store/useEmployeeStore";
import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { createEmployeeAPI, deleteEmployeeAPI, getAllEmployeesAPI } from "@/apis/Employees";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(15, "Name must be maximum 10 characters long"),
  role: z.string(),
});

function Employees() {
  const setEmployees = useEmployeStore((state) => state.setEmployees);
  const employees = useEmployeStore((state) => state.employees);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "Viewer", // Pre-select default role
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const fetchEmployees = async () => {
    try {
      const getEmployees = await getAllEmployeesAPI();

      setEmployees(getEmployees?.data ?? []);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createEmployeeAPI(values.name, values.role);
    fetchEmployees();
    form.reset();
  };

  const handleDeleteEmployee = async (id: number) => {
    await deleteEmployeeAPI(id);
    fetchEmployees();
  };
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 lg:p-12 w-full">
      <h2 className="text-xl font-bold md:text-2xl mb-10">Create Employees</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {employees &&
          employees.length > 0 && ( // Check for employees and empty list
            <div className="border rounded-md p-4 shadow-sm">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-2 font-medium text-base tracking-wider">Name</th>
                    <th className="text-left px-4 py-2 font-medium text-base tracking-wider">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.name}>
                      <td className="text-left px-4 py-4">{employee.name}</td>
                      <td className="text-left px-4 py-4">{employee.role}</td>
                      <td className="text-right px-4 py-4">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost">
                              {" "}
                              <Trash2 className="cursor-pointer hover:text-red-500" />{" "}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction className=" bg-transparent hover:bg-transparent">
                                <Button type="button" className="" variant={"destructive"} onClick={() => handleDeleteEmployee(employee.id)}>
                                  Continue
                                </Button>
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        {employees &&
          employees.length === 0 && ( // Display a message for empty list
            <p className="text-gray-500 font-medium">No employees found.</p>
          )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue>{field.value || "Select"}</SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Viewer">Viewer</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Add Employee</Button> {/* Clearer button text */}
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Employees;
