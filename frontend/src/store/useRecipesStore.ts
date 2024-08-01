import { RecipeDTO } from "@/models/Recipe";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type RecipeStore = {
  recipes: RecipeDTO[];
  setRecipes: (recipes: RecipeDTO[]) => void;
};

const useRecipesStore = create(
  persist<RecipeStore>(
    (set) => ({
      recipes: [],
      setRecipes: async (recipes) => {
        set({ recipes });
      },
    }),
    { name: "recipes" }
  )
);
export default useRecipesStore;
