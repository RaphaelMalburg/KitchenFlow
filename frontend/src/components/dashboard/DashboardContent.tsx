import { useState, useEffect, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { deleteImageAPI, getAllImagesAPI } from "@/apis/RosterImages";
import { ImageDTO } from "@/models/ImageDTO";
import { Pencil, Trash2 } from "lucide-react";
import useStations from "@/store/useStationsStore";
import { Link } from "react-router-dom";
import useEmployeStore from "@/store/useEmployeeStore";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import { Button } from "../ui/button";
import DashboardImageUpload from "./DashboardUpload";

const DashboardContent = () => {
  const [images, setImages] = useState<ImageDTO[]>([]);
  const stations = useStations((state) => state.stations);
  const [isNotAdmin, setIsNotAdmin] = useState<boolean | null>(true);
  const useCurrentEmployee = useEmployeStore((state) => state.currentEmployee);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const dialogUpdateCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (useCurrentEmployee.role === "Admin") {
      setIsNotAdmin(false);
    }
  }, [useCurrentEmployee]);

  const fetchImages = async () => {
    const data = await getAllImagesAPI();
    if (data) setImages(data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDeleteImage = async (fileName: string) => {
    try {
      await deleteImageAPI(fileName);
      fetchImages();
      dialogUpdateCloseRef.current?.click();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="col-span-1 sm:col-span-2 lg:col-span-3 rounded-lg overflow-hidden">
        <Carousel className="w-full">
          <h3 className="text-lg font-semibold mb-2">Roster</h3>
          <CarouselContent>
            {images.length > 0 ? (
              images.map((image, index) => (
                <CarouselItem key={index} className="relative">
                  {!isNotAdmin && (
                    <>
                      {images.length > 0 ? (
                        <>
                          {" "}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Trash2 className="h-6 w-6 text-red-600 absolute z-40 bottom-4 right-4 cursor-pointer" />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete your image and remove your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-transparent hover:bg-transparent">
                                  <Button type="button" variant={"destructive"} onClick={() => handleDeleteImage(image.fileName)}>
                                    Continue
                                  </Button>
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Pencil className="h-6 w-6 text-muted-foreground absolute z-40 top-4 right-4 cursor-pointer" />
                            </DialogTrigger>
                            <DialogClose asChild>
                              <button type="submit" ref={dialogCloseRef}></button>
                            </DialogClose>
                            <DialogContent className="sm:max-w-[425px]">
                              <DashboardImageUpload closeHandle={dialogCloseRef} />
                            </DialogContent>
                          </Dialog>{" "}
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  )}

                  <img src={image.url} alt={image.fileName} width={700} height={400} className="object-contain w-full aspect-[16/9]" />
                </CarouselItem>
              ))
            ) : (
              <>
                <CarouselItem>
                  <img src="/kitchen-flow.png" alt="No images available" width={700} height={400} className="object-cover w-full aspect-[16/9]" />
                </CarouselItem>
                <Dialog>
                  <DialogTrigger asChild>
                    <Pencil className="h-6 w-6 text-muted-foreground absolute z-40 top-4 right-4 cursor-pointer" />
                  </DialogTrigger>
                  <DialogClose asChild>
                    <button type="submit" ref={dialogCloseRef}></button>
                  </DialogClose>
                  <DialogContent className="sm:max-w-[425px]">
                    <DashboardImageUpload closeHandle={dialogCloseRef} />
                  </DialogContent>
                </Dialog>
              </>
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="p-4 rounded-lg grid gap-2 overflow-y-auto max-h-96 col-span-2">
        <h3 className="text-lg font-semibold mb-2">Stations</h3>
        {stations &&
          stations.map((station, key) => (
            <Link to={`stations/preplist/` + station.id} className="border rounded-md bg-slate-200/35 my-auto py-4 font-medium" key={key}>
              {station.name}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default DashboardContent;
