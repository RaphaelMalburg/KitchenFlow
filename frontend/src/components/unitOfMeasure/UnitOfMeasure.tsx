import { UnitOfMeasureDTO } from "@/models/Stations";
import useStations from "@/store/useStationsStore";
import { useEffect, useRef, useState } from "react";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardTitle, CardHeader, Card } from "@/components/ui/card";
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
import { createUnitMeasureAPI, deleteUnitMeasureAPI, getAllUnitMeasureAPI, updateUnitMeasureAPI } from "@/apis/UnitMeasure";

const formSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 characters").max(10, "Name must be maximum 10 characters long"),
});

const UnitOfMeasure = () => {
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const dialogCloseRefUpdate = useRef<HTMLButtonElement>(null);
  const setUnitOfMeasure = useStations((state) => state.setUnitOfMeasure);
  const [UOMId, setUOMId] = useState<number>(0);
  const unitOfMeasureList = useStations((station) => station.unitOfMeasure) || [];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const fetchData = async () => {
    try {
      const UOM = await getAllUnitMeasureAPI();
      if (UOM !== undefined) setUnitOfMeasure(UOM.data);
    } catch (err) {
      console.log(err);
    }
  };

  const baseUnits = async () => {
    if (unitOfMeasureList.length == 0) {
      const data: UnitOfMeasureDTO = {
        id: 0,
        name: "Kg",
      };
      await createUnitMeasureAPI(data);
    }
  };
  useEffect(() => {
    fetchData();
    baseUnits();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data: UnitOfMeasureDTO = {
        id: 0,
        name: values.name,
      };
      await createUnitMeasureAPI(data);
      dialogCloseRef.current?.click();
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitUpdate = async (values: z.infer<typeof formSchema>) => {
    try {
      const data: UnitOfMeasureDTO = {
        id: UOMId,
        name: values.name,
      };
      await updateUnitMeasureAPI(data);
      dialogCloseRefUpdate.current?.click();
      fetchData();
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUnitMeasure = async (id: number) => {
    try {
      await deleteUnitMeasureAPI(id);
      fetchData();
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col gap-8 w-full">
      <header className="flex items-center justify-between container">
        <h1 className="text-2xl font-bold md:text-3xl">Unit of measure</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Add Unit of measure</Button>
          </DialogTrigger>
          <DialogClose asChild>
            <button type="submit" ref={dialogCloseRef}></button>
          </DialogClose>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Unit of measure</DialogTitle>
              <DialogDescription>Add your unit of measure here. Click save when you're done.</DialogDescription>
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
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {unitOfMeasureList.length > 0 ? (
          unitOfMeasureList.map((unitMeasure, index) => (
            <Card key={index} className="relative">
              <CardHeader className="grid relative  w-full">
                <CardTitle className="">
                  {unitMeasure.name}
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
                          <Button type="button" className="" variant={"destructive"} onClick={() => handleDeleteUnitMeasure(unitMeasure.id)}>
                            Continue
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Pencil size={16} className="absolute top-1 right-3 cursor-pointer" onClick={() => setUOMId(unitMeasure.id)} />
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px]">
                      <DialogClose asChild>
                        <button type="submit" ref={dialogCloseRefUpdate}></button>
                      </DialogClose>
                      <DialogHeader>
                        <DialogTitle>Update unit of measure Name</DialogTitle>
                        <DialogDescription>Update your working unit of measure here. Click save when you're done.</DialogDescription>
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

                          <DialogFooter>
                            <Button type="submit">Save changes</Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
            </Card>
          ))
        ) : (
          <p>No units of measure available.</p>
        )}
      </div>
    </section>
  );
};

export default UnitOfMeasure;
