import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { Button } from "../ui/button";
import useRecipesStore from "@/store/useRecipesStore";
import RecipesList from "./RecipesList";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useEmployeStore from "@/store/useEmployeeStore";
import { addRecipeAPI, getAllRecipesAPI } from "@/apis/Recipes";
import DOMPurify from "dompurify";
import { RecipeDTO } from "@/models/Recipe";

const formSchema = z.object({
  name: z.string().min(2, "Title must be at least 2 characters").max(100, "Title must be maximum 100 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
});

const formSearch = z.object({
  name: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;
type FormSearchData = z.infer<typeof formSearch>;

const Recipes = () => {
  const recipes = useRecipesStore((state) => state.recipes);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const [isNotAdmin, setIsNotAdmin] = useState<boolean | null>(true);
  const useCurrentEmployee = useEmployeStore((state) => state.currentEmployee);
  const setRecipes = useRecipesStore((state) => state.setRecipes);
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeDTO[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const formSearchs = useForm<FormSearchData>({
    resolver: zodResolver(formSearch),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (useCurrentEmployee.role === "Admin") {
      setIsNotAdmin(false);
    }
  }, [useCurrentEmployee]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const recipesData = await getAllRecipesAPI();
      if (recipesData) {
        const sanitizedRecipes = recipesData.data.map((recipe) => ({
          ...recipe,
          description: DOMPurify.sanitize(recipe.description),
        }));
        setRecipes(sanitizedRecipes); // Update store with fetched data
        setFilteredRecipes(sanitizedRecipes); // Update local state for search
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const onSubmit = async (values: FormData) => {
    try {
      const data: RecipeDTO = {
        name: values.name,
        id: 0,
        description: values.description,
      };
      await addRecipeAPI(data);
      dialogCloseRef.current?.click();
      fetchData();
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    formSearchs.setValue("name", searchTerm);
    const filtered = recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchTerm));
    setFilteredRecipes(filtered);
  };

  return (
    <>
      <div className="w-full flex-1 px-4">
        <Form {...formSearchs}>
          <form className="space-y-8">
            <FormField
              control={formSearchs.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground mr-2" />
                      <Input
                        placeholder="Search recipes..."
                        {...field}
                        onChange={handleSearchChange}
                        className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div className="flex items-center justify-center relative w-full ">
        <h1 className="text-lg font-semibold md:text-2xl text-start pl-4 flex-1 py-4">Recipes</h1>
        {!isNotAdmin && (
          <Dialog>
            <DialogTrigger asChild className="ml-auto">
              <Button variant="default">Add Recipe</Button>
            </DialogTrigger>
            <DialogClose asChild>
              <button type="submit" ref={dialogCloseRef}></button>
            </DialogClose>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Recipe</DialogTitle>
                <DialogDescription>Add your recipes here. Click save when you're done.</DialogDescription>
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
                          <ReactQuill theme="snow" value={field.value} onChange={field.onChange} className="mt-1" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Save Recipe</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <RecipesList recipes={filteredRecipes} />
    </>
  );
};

export default Recipes;
