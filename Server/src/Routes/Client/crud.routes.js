import { Router } from "express";
import { createMeal } from "../../Controllers/meal.controller.js";

const crud = Router();

crud.post('/create-meal',createMeal)

export default crud