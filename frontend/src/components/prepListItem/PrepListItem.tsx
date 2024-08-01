import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createPrepListItem, getAllPrepListItems, deletePrepListItemAPI, updatePrepListItemAPI } from "@/apis/PrepListItem";
import useStations from "@/store/useStationsStore";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CardTitle, CardHeader, Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PrepListItemDTO } from "@/models/Stations";
import { Pencil, Trash } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(25, "Name must be maximum 25 characters long"),
  amount: z.number().min(0, "Amount must be at least 0"),
  storagePlaceId: z.string(),
  unitMeasureId: z.string(),
  isDone: z.boolean(),
});

const PrepListItem = () => {
  const params = useParams<{ stationId: string }>();
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const dialogCloseRefUpdate = useRef<HTMLButtonElement>(null);
  const setPrepListItem = useStations((state) => state.setPrepListItems);
  const storagePlacesList = useStations((state) => state.storagePlaces) || [];
  const unitOfMeasureList = useStations((state) => state.unitOfMeasure) || [];
  const prepListItems = useStations((state) => state.prepListItems) || [];
  let stationIdNumber: number;
  if (params.stationId != undefined) stationIdNumber = parseInt(params.stationId);
  const [currentItem, setCurrentItem] = useState<PrepListItemDTO | null>(null);
  const [currentItemId, setCurrentItemId] = useState<number>(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 0,
      storagePlaceId: "",
      unitMeasureId: "",
      isDone: false,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const fetchData = async () => {
    try {
      const data = await getAllPrepListItems(stationIdNumber);
      if (data !== undefined) setPrepListItem(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(currentItem);
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data: PrepListItemDTO = {
        id: 0,
        name: values.name,
        amount: values.amount,
        stationId: stationIdNumber,
        storagePlaceId: parseInt(values.storagePlaceId),
        unitMeasureId: parseInt(values.unitMeasureId),
        isDone: values.isDone,
      };

      await createPrepListItem(data, stationIdNumber);

      dialogCloseRef.current?.click();
      fetchData();
      setCurrentItem(null);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitUpdate = async (values: z.infer<typeof formSchema>) => {
    try {
      const data: PrepListItemDTO = {
        id: currentItemId,
        name: values.name,
        amount: 0,
        stationId: stationIdNumber,
        storagePlaceId: parseInt(values.storagePlaceId),
        unitMeasureId: parseInt(values.unitMeasureId),
        isDone: false,
      };

      await updatePrepListItemAPI(data);

      dialogCloseRefUpdate.current?.click();
      fetchData();
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePrepListItem = async (id: number) => {
    try {
      await deletePrepListItemAPI(id);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col gap-8 w-full">
      <header className="flex items-center justify-between container">
        <h1 className="text-2xl font-bold md:text-3xl">Prep List Item</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Add a Prep List Item</Button>
          </DialogTrigger>
          <DialogClose asChild>
            <button type="submit" ref={dialogCloseRef}></button>
          </DialogClose>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a Prep List Item</DialogTitle>
              <DialogDescription>Add your prep list items here. Click save when you're done.</DialogDescription>
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
                  name="storagePlaceId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Storage Place</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue>{storagePlacesList.find((sp) => sp.id.toString() === field.value)?.name || "Select"}</SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {storagePlacesList.map((storagePlace) => (
                            <SelectItem key={storagePlace.id} value={storagePlace.id.toString()}>
                              {storagePlace.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="unitMeasureId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit of Measure</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue>{unitOfMeasureList.find((um) => um.id.toString() === field.value)?.name || "Select"}</SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {unitOfMeasureList.map((unitMeasure) => (
                            <SelectItem key={unitMeasure.id} value={unitMeasure.id.toString()}>
                              {unitMeasure.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
        {prepListItems.length > 0
          ? prepListItems.map((prepListItem, index) => (
              <Card key={index} className="relative">
                <CardHeader className="grid relative w-full">
                  <CardTitle>
                    {prepListItem.name}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Trash size={16} className="text-red-600 absolute top-1 right-12 cursor-pointer" />
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

                          <Button type="button" variant="destructive" onClick={() => handleDeletePrepListItem(prepListItem.id)}>
                            Continue
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Pencil size={16} className="absolute top-1 right-3 cursor-pointer" onClick={() => setCurrentItemId(prepListItem.id)} />
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogClose asChild>
                          <button type="submit" ref={dialogCloseRefUpdate}></button>
                        </DialogClose>
                        <DialogHeader>
                          <DialogTitle>Update Prep List Item</DialogTitle>
                          <DialogDescription>Update your prep list item here. Click save when you're done.</DialogDescription>
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
                              name="storagePlaceId"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Storage Place</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue>{storagePlacesList.find((sp) => sp.id.toString() === field.value)?.name || "Select"}</SelectValue>
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {storagePlacesList.map((storagePlace) => (
                                        <SelectItem key={storagePlace.id} value={storagePlace.id.toString()}>
                                          {storagePlace.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="unitMeasureId"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Unit of Measure</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue>{unitOfMeasureList.find((um) => um.id.toString() === field.value)?.name || "Select"}</SelectValue>
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {unitOfMeasureList.map((unitMeasure) => (
                                        <SelectItem key={unitMeasure.id} value={unitMeasure.id.toString()}>
                                          {unitMeasure.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
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
          : ""}
      </div>
    </section>
  );
};

export default PrepListItem;
