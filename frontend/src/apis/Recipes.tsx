import { RecipeDTO } from "@/models/Recipe";
import axiosInstance from "@/services/axiosInstace";

import { toast } from "react-toastify";
const baseUrl = "https://kitchenflowapi.azurewebsites.net";

export const addRecipeAPI = async (recipe: RecipeDTO) => {
  try {
    const data = await axiosInstance.post<RecipeDTO>(`${baseUrl}/api/Recipe`, recipe);
    toast.success("Recipe added successfully");
    return data;
  } catch (error) {
    toast.error("Error creating recipe");
    console.error(error);
  }
};

export const removeRecipeAPI = async (recipeId: number) => {
  try {
    const data = await axiosInstance.delete<number>(`${baseUrl}/api/Recipe/${recipeId}`);
    toast.success("Recipe deleted successfully");
    return data;
  } catch (error) {
    toast.error("Error deleting recipe");
    console.error(error);
  }
};

export const getAllRecipesAPI = async () => {
  try {
    const data = await axiosInstance.get<RecipeDTO[]>(`${baseUrl}/api/Recipe`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getRecipeByIdAPI = async (recipeId: number) => {
  try {
    const data = await axiosInstance.get<RecipeDTO>(`${baseUrl}/api/Recipe/${recipeId}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateRecipe = async (recipe: RecipeDTO) => {
  try {
    const data = await axiosInstance.patch<RecipeDTO>(`${baseUrl}/api/Recipe`, recipe);
    toast.success("Recipe updated successfully");
    return data;
  } catch (error) {
    toast.error("Error updating recipe");
    console.error(error);
  }
};
