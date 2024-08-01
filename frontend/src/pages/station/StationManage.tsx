// File path: /src/components/StationManage.tsx

import { addStoragePlaceAPI, deleteStoragePlaceAPI, getStoragePlaceAPI, updateStoragePlaceAPI } from "@/apis/StoragePlace";
// New APIs

import useStations from "@/store/useStationsStore";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
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
import { Pencil, Trash } from "lucide-react";
import UnitOfMeasure from "../../components/unitOfMeasure/UnitOfMeasure";
import PrepListItem from "../../components/prepListItem/PrepListItem";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(15, "Name must be maximum 10 characters long"),
  description: z.string().min(2, "Description must be at least 2 characters").max(25, "Description must be maximum 25 characters long"),
});

{
  /**const preplistFormSchema = z.object({
  itemName: z.string().min(2, "Item name must be at least 2 characters").max(20, "Item name must be maximum 20 characters long"),
}); */
}

const StationManage = () => {
  const params = useParams<{ stationId: string }>();
  const setStoragePlaces = useStations((state) => state.setStoragePlaces);
  const storagePlaces = useStations((state) => state.storagePlaces);

  let stationIdNumber: number;
  if (params.stationId != undefined) stationIdNumber = parseInt(params?.stationId);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const dialogCloseRefUpdate = useRef<HTMLButtonElement>(null);
  const unitOfMeasureList = useStations((station) => station.unitOfMeasure);
  const [currentStorage, setCurrentStorage] = useState<number | null | undefined>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const fetchData = async () => {
    try {
      const storagePlacesList = await getStoragePlaceAPI(stationIdNumber);

      setStoragePlaces(storagePlacesList || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await addStoragePlaceAPI(stationIdNumber, values.name, values.description);
      dialogCloseRef.current?.click();
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitUpdate = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateStoragePlaceAPI(currentStorage || 0, values.name, values.description);
      dialogCloseRefUpdate.current?.click();
      fetchData();
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteStoragePlace = async (id: number) => {
    try {
      await deleteStoragePlaceAPI(id);
      fetchData();
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col gap-8 p-4 md:p-8 lg:p-12 w-full">
      <header className="flex items-center justify-between container">
        <h1 className="text-2xl font-bold md:text-3xl">Storage Places </h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Add Storage Places</Button>
          </DialogTrigger>
          <DialogClose asChild>
            <button type="submit" ref={dialogCloseRef}></button>
          </DialogClose>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Storage Places</DialogTitle>
              <DialogDescription>Add your storage places here. Click save when you're done.</DialogDescription>
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
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
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
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!storagePlaces ? null : (
          <>
            {storagePlaces.map((storagePlace, index) => (
              <Card key={index} className="relative">
                <CardHeader className="grid relative  w-full">
                  <CardTitle className="">
                    {storagePlace.name}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Trash size={16} className=" text-red-600 absolute top-1 right-12 cursor-pointer" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your Storage Place and remove your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className=" bg-transparent hover:bg-transparent">
                            <Button type="button" className="" variant={"destructive"} onClick={() => handleDeleteStoragePlace(storagePlace.id)}>
                              Continue
                            </Button>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Pencil size={16} className="absolute top-1 right-3 cursor-pointer" />
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-[425px]">
                        <DialogClose asChild>
                          <button type="submit" ref={dialogCloseRefUpdate}></button>
                        </DialogClose>
                        <DialogHeader>
                          <DialogTitle>Update Station Name</DialogTitle>
                          <DialogDescription>Update your working stations here. Click save when you're done.</DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmitUpdate)} className="space-y-8">
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
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description</FormLabel>
                                  <FormControl>
                                    <Input placeholder="" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <DialogFooter>
                              <Button type="submit" onClick={() => setCurrentStorage(storagePlace.id)}>
                                Save changes
                              </Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                </CardHeader>
                <CardContent className=" grid gap-2">{storagePlace.description}</CardContent>
              </Card>
            ))}
          </>
        )}
      </div>{" "}
      <UnitOfMeasure />
      {unitOfMeasureList.length > 0 && storagePlaces.length > 0 ? <PrepListItem /> : <h1>create a storage place and a unit list before creating preplist items</h1>}
    </main>
  );
};

export default StationManage;
