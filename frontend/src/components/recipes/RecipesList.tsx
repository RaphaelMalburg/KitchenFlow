import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { Button } from "../ui/button";
import { RecipeDTO } from "@/models/Recipe";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { ChevronDownIcon, Pencil } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
import { Input } from "../ui/input";
import { getAllRecipesAPI, removeRecipeAPI, updateRecipe } from "@/apis/Recipes";
import useRecipesStore from "@/store/useRecipesStore";
import useEmployeStore from "@/store/useEmployeeStore";

type Props = {
  recipes: RecipeDTO[];
};

const formSchema = z.object({
  name: z.string().min(2, "Title must be at least 2 characters").max(100, "Title must be maximum 100 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
});

const RecipesList = (props: Props) => {
  const [isNotAdmin, setIsNotAdmin] = useState<boolean | null>(true);
  const useCurrentEmployee = useEmployeStore((state) => state.currentEmployee);
  const [currentRecipe, setCurrentRecipe] = useState<number | null>();
  const setRecipes = useRecipesStore((state) => state.setRecipes);
  const dialogUpdateCloseRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
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
      const recipesData = await getAllRecipesAPI();
      if (recipesData !== undefined) setRecipes(recipesData.data); // Update store with fetched data
    } catch (error) {
      console.error("Error fetching stations:", error);
    }
  };
  const handleEditClick = async (values: z.infer<typeof formSchema>) => {
    const recipe: RecipeDTO = {
      id: currentRecipe || 0,
      name: values.name,
      description: values.description,
    };
    await updateRecipe(recipe);

    fetchData(); // Call the function on component mount

    form.reset();
    // Simulate click on close button

    dialogUpdateCloseRef.current?.click();
  };

  const handleDeleteRecipe = async () => {
    await removeRecipeAPI(currentRecipe || 0);
    fetchData();
  };
  return (
    <article className="w-full ">
      <li className=" px-4 grid pt-5 ">
        {props.recipes.map((recipes, index) => (
          <div className="space-y-2" key={index}>
            <Collapsible>
              <CollapsibleTrigger className="flex w-full items-center relative justify-between rounded-md bg-gray-100 px-4 py-3 text-left text-lg font-medium transition-all hover:bg-gray-200 focus:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                {recipes.name}
                <div className="flex gap-3">
                  {" "}
                  <ChevronDownIcon className="h-5 w-5 justify-end transition-all" />
                  {!isNotAdmin ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Pencil size={16} className="  cursor-pointer" />
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Update Recipe </DialogTitle>
                          <DialogDescription>Update your recipe here. Click save when you're done.</DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(handleEditClick)} className="space-y-8">
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
                                    <ReactQuill theme="snow" value={field.value} onChange={field.onChange} className="mt-1" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <DialogFooter className="grid grid-cols-2 gap-x-8 justify-between w-full">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button type="button" className="w-2/3" variant={"destructive"} onClick={() => setCurrentRecipe(recipes.id)}>
                                    Delete Recipe
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently delete your Recipe and remove your data from our servers.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className=" bg-transparent hover:bg-transparent">
                                      <Button type="button" className="" variant={"destructive"} onClick={() => handleDeleteRecipe()}>
                                        Continue
                                      </Button>
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                              <Button type="submit" onClick={() => setCurrentRecipe(recipes.id)}>
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
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 py-3 text-gray-500 dark:text-gray-400 text-left">
                <p dangerouslySetInnerHTML={{ __html: recipes.description }} />
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
      </li>
    </article>
  );
};

export default RecipesList;
