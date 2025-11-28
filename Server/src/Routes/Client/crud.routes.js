import { Router } from "express";
import {
  createMeal,
  FetchMeal,
  GetRecipe,
} from "../../Controllers/meal.controller.js";

const crud = Router();

crud.post("/create-meal", createMeal);
crud.post("/get-meal", FetchMeal);
crud.get("/get-recipe", GetRecipe);

export default crud;
