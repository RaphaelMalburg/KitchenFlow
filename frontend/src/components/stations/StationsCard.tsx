import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StationDTO } from "@/models/Stations";
import { updateStationAPI } from "@/apis/Stations";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";

interface StationCardProps {
  station: StationDTO;
  handleEditClick: (id: number, name: string) => void;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(10, "Name must be maximum 10 characters long"),
});

const StationCard: React.FC<StationCardProps> = ({ station, handleEditClick }) => {
  const { id, name } = station;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleEdit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateStationAPI(id.toString(), values.name);
      // Handle successful update (e.g., close dialog)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="grid relative ">
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline">Create PrepList</Button>
        </CardContent>
      </Card>{" "}
      <Dialog>
        <DialogTrigger asChild>
          <Pencil size={16} className="absolute top-1 right-3 cursor-pointer" onClick={() => handleEditClick(id, name)} />
        </DialogTrigger>
        <DialogClose asChild>
          <button type="submit"></button> {/* Replace with hidden button */}
        </DialogClose>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Station</DialogTitle>
            <DialogDescription>Change the name of your station.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEdit)} className="space-y-8">
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
    </>
  );
};

export default StationCard;
