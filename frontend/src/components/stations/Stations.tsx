import { addStationAPI, deleteStation, getStation, updateStationAPI } from "@/apis/Stations";
import useStations from "@/store/useStationsStore";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Pencil } from "lucide-react";
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
import useEmployeStore from "@/store/useEmployeeStore";
import { Link, Outlet, useParams } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(15, "Name must be maximum 10 characters long"),
});
const formSchemaUpdate = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(15, "Name must be maximum 10 characters long"),
});
export default function Stations() {
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const dialogUpdateCloseRef = useRef<HTMLButtonElement>(null);
  const setStations = useStations((state) => state.setStations);
  const stations = useStations((state) => state.stations);
  const [currentStation, setCurrentStation] = useState<number | null>();
  const useCurrentEmployee = useEmployeStore((state) => state.currentEmployee);
  const [isNotAdmin, setIsNotAdmin] = useState<boolean | null>(true);
  const { stationId } = useParams<{ stationId: string }>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },

    mode: "onChange",
    reValidateMode: "onChange",
  });
  const formUpdate = useForm<z.infer<typeof formSchemaUpdate>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },

    mode: "onChange",
    reValidateMode: "onChange",
  });
  useEffect(() => {
    if (useCurrentEmployee.role == "Admin") {
      setIsNotAdmin(false);
    }
  }, [useCurrentEmployee]);
  const fetchData = async () => {
    try {
      const stationData = await getStation();
      if (stationData !== undefined) setStations(stationData.data); // Update store with fetched data
    } catch (error) {
      console.error("Error fetching stations:", error);
    }
  };
  useEffect(() => {
    fetchData(); // Call the function on component mount
  }, []);

  const handleEditClick = async (values: z.infer<typeof formSchemaUpdate>) => {
    const id = currentStation?.toString();
    await updateStationAPI(id || "", values.name);

    fetchData(); // Call the function on component mount

    form.reset();
    // Simulate click on close button

    dialogUpdateCloseRef.current?.click();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await addStationAPI(values.name);
      dialogCloseRef.current?.click();
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteStation = async () => {
    try {
      await deleteStation(currentStation || 0);
      fetchData();

      form.reset();

      dialogUpdateCloseRef.current?.click();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <main className="flex flex-col gap-8 p-4 md:p-8 lg:p-12 w-full">
        {stationId ? null : (
          <>
            <header className="flex items-center justify-between container">
              <h1 className="text-2xl font-bold md:text-3xl">Kitchen Management</h1>
              {!isNotAdmin ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default">Add Station</Button>
                  </DialogTrigger>
                  <DialogClose asChild>
                    <button type="submit" ref={dialogCloseRef}></button>
                  </DialogClose>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Station</DialogTitle>
                      <DialogDescription>Add your working stations here. Click save when you're done.</DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        <DialogFooter>
                          <Button type="submit">Save changes</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              ) : (
                ""
              )}
            </header>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {stations.length > 0 &&
                stations.map((station, key) => (
                  <div key={key}>
                    <Card>
                      <CardHeader className="grid relative ">
                        <CardTitle>{station.name}</CardTitle>
                        {!isNotAdmin ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Pencil size={16} className="absolute top-1 right-3 cursor-pointer" />
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Update Station Name</DialogTitle>
                                <DialogDescription>Update your working stations here. Click save when you're done.</DialogDescription>
                              </DialogHeader>
                              <Form {...form}>
                                <form onSubmit={formUpdate.handleSubmit(handleEditClick)} className="space-y-8">
                                  <FormField
                                    control={formUpdate.control}
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
                                  <DialogFooter className="grid grid-cols-2 gap-x-8 justify-between w-full">
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button type="button" className="w-2/3" variant={"destructive"} onClick={() => setCurrentStation(station.id)}>
                                          Delete Station
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your Station and remove your data from our servers.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction className=" bg-transparent hover:bg-transparent">
                                            <Button type="button" className="" variant={"destructive"} onClick={() => handleDeleteStation()}>
                                              Continue
                                            </Button>
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                    <Button type="submit" onClick={() => setCurrentStation(station.id)}>
                                      Save changes
                                    </Button>
                                  </DialogFooter>{" "}
                                  <DialogClose asChild>
                                    <button type="button" ref={dialogUpdateCloseRef}></button>
                                  </DialogClose>
                                </form>
                              </Form>{" "}
                            </DialogContent>
                          </Dialog>
                        ) : (
                          ""
                        )}
                      </CardHeader>
                      <CardContent className=" grid gap-2">
                        <Button variant="outline">
                          <Link to={`preplist/${station.id}`}>Create PrepList</Link>
                        </Button>{" "}
                        {!isNotAdmin ? (
                          <Button variant="outline">
                            <Link to={`station/${station.id}`}>Manage Station</Link>
                          </Button>
                        ) : (
                          ""
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ))}
            </div>
          </>
        )}
        <Outlet />
      </main>
    </>
  );
}
