import { Router } from "express";
import {
  createMeal,
  FetchMeal,
  GetRecipeByMealId,
} from "../../Controllers/meal.controller.js";

const crud = Router();

crud.post("/create-meal", createMeal);
crud.post("/get-meal", FetchMeal);
crud.get("/get-recipe/:id", GetRecipeByMealId);

export default crud;
