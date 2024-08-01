import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useStations from "@/store/useStationsStore";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { addPrepListAPI } from "@/apis/PrepList";
import { PrepListDTO } from "@/models/Stations";

import { getAllPrepListItems } from "@/apis/PrepListItem";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(40, "Name must be maximum 40 characters long"),
  description: z.string().max(80, "Description must be maximum 80 characters long"),
  itemIds: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        unitMeasureId: z.number(),
      })
    )
    .nonempty("Item IDs cannot be empty"),
});

interface PreplistItemForArrayDTO {
  id: number;
  name: string;
  unitMeasureId: number;
  quantity: number;
}

export default function PrepList() {
  const params = useParams<{ stationId: string }>();
  const [stationName, setStationName] = useState("");
  const [selectedItems, setSelectedItems] = useState<PreplistItemForArrayDTO[]>([]);
  const unitMeasure = useStations((state) => state.unitOfMeasure);
  const storagePlacesList = useStations((state) => state.storagePlaces) || [];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      itemIds: [
        {
          id: 0,
          name: "",
          quantity: 1,
          unitMeasureId: 0,
        },
      ],
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "itemIds",
  });

  const prepListItems = useStations((state) => state.prepListItems) || [];
  const setPrepListItem = useStations((state) => state.setPrepListItems);

  const stations = useStations((state) => state.stations) || [];
  let stationId: number;
  if (params.stationId !== undefined) stationId = parseInt(params.stationId);
  useEffect(() => {
    const matchedStation = stations.find((station) => station.id === stationId);
    if (matchedStation) {
      setStationName(matchedStation.name);
    }
  }, [params.stationId, stations]);
  const fetchData = async () => {
    try {
      const data = await getAllPrepListItems(stationId);
      if (data !== undefined) setPrepListItem(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    form.reset({ ...form.getValues(), name: stationName });
  }, [stationName, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const arrayId = values.itemIds.slice(1).map((value) => value.id);

    const list: PrepListDTO = {
      id: 0,
      name: values.name,
      description: values.description,
    };
    await addPrepListAPI(list, arrayId, stationId);
  };

  const handleCheckboxChange = (checked: boolean, prepListItem: PreplistItemForArrayDTO) => {
    if (checked) {
      setSelectedItems([...selectedItems, { ...prepListItem, quantity: 1 }]);
      append({
        id: prepListItem.id,
        name: prepListItem.name,
        unitMeasureId: prepListItem.unitMeasureId,
        quantity: 1,
      });
    } else {
      setSelectedItems(selectedItems.filter((item) => item.id !== prepListItem.id));
      const index = fields.findIndex((field) => field.id == prepListItem.id);

      remove(index);
    }
  };

  const formatMessage = (values: z.infer<typeof formSchema>) => {
    function findName(id: number) {
      const name = unitMeasure.find((item) => item.id === id);
      return name?.name;
    }

    const text = `
      Name: ${values.name}
      \n
      Items:
      \n
      ${values.itemIds.map((item) => `Item: ${item.name}, QTY: ${item.quantity}, Unit: ${findName(item.unitMeasureId)}`).join("\n")}
          \n
      Description: ${values.description}
    `;

    return text;
  };

  const handleSendWhatsApp = () => {
    const values = form.getValues();
    const message = formatMessage(values);
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  const handleDownloadPDF = () => {
    const values = form.getValues();
    const message = formatMessage(values);
    const doc = new jsPDF();
    const startY = 10;
    doc.text(message, 10, startY);
    doc.save("prep_list.pdf");
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create a Prep List</CardTitle>
        <CardDescription>Create a new prep list by selecting the items</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {storagePlacesList.map((storagePlace, storagePlaceIndex) => (
              <div key={storagePlaceIndex}>
                {storagePlace.stationId == stationId ? (
                  <>
                    {" "}
                    <Label className="font-semibold">{storagePlace.name}</Label>
                    <div className="grid gap-2 mt-2">
                      {prepListItems.map(
                        (prepListItem, itemIndex) =>
                          prepListItem.storagePlaceId === storagePlace.id && (
                            <div key={prepListItem.id} className="flex items-center gap-2 ">
                              <Checkbox
                                id={`prepListItem-${itemIndex}`}
                                checked={selectedItems.some((item) => item.id === prepListItem.id)}
                                onCheckedChange={(checked) =>
                                  handleCheckboxChange(Boolean(checked), {
                                    id: prepListItem.id,
                                    name: prepListItem.name,
                                    unitMeasureId: prepListItem.unitMeasureId,
                                    quantity: prepListItem.quantity || 0,
                                  })
                                }
                              />
                              <Label htmlFor={`prepListItem-${itemIndex}`}>{prepListItem.name}</Label>
                              {selectedItems.some((item) => item.id === prepListItem.id) && (
                                <>
                                  <FormField
                                    control={form.control}
                                    name={`itemIds.${selectedItems.findIndex((item) => item.id === prepListItem.id)}.quantity`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input type="number" value={field.value} onChange={(e) => field.onChange(e.target.valueAsNumber)} className="w-14" />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <input
                                    type="hidden"
                                    value={prepListItem.name}
                                    {...form.register(`itemIds.${selectedItems.findIndex((item) => item.id === prepListItem.id)}.name`)}
                                  />
                                  <input
                                    type="hidden"
                                    value={prepListItem.unitMeasureId}
                                    {...form.register(`itemIds.${selectedItems.findIndex((item) => item.id === prepListItem.id)}.unitMeasureId`)}
                                  />
                                </>
                              )}
                            </div>
                          )
                      )}
                    </div>{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
            ))}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 justify-center">
              <Button type="submit">Create prep list</Button>
              {selectedItems.length > 0 && (
                <div className="flex gap-2">
                  {" "}
                  <Button type="button" variant={"secondary"} onClick={handleSendWhatsApp}>
                    Send via WhatsApp
                  </Button>
                  <Button type="button" onClick={handleDownloadPDF}>
                    Download as PDF
                  </Button>
                </div>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
