import { json } from "zod";
import { Meal, Recipe } from "../Models/Meal.Model.js";
import { aiSchema } from "../Utils/aiSchema.js";
import { extractJSON } from "../Utils/extractjson.js";
import { Prompt } from "../Utils/prompt.js";
import genAI from "../config/genAI.js";
import { zodToJsonSchema } from "zod-to-json-schema";

export const createMeal = async (req, res) => {
  try {
    const { mealName, serving, note } = req.body;
    const userId = req.user.id;

    if (!mealName) {
      return res.status(400).json({ msg: "Please provide Meal name" });
    }

    const meal = await Meal.create({
      user: userId,
      mealName,
      serving,
      note,
    });

    const prompt = Prompt(mealName, serving, note);

    const recipeResult = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(aiSchema, "recipeSchema"),
      },
    });

    const responseText = recipeResult.text || recipeResult.response?.text();
    // console.log("📄 Response text:", responseText);

    const recipe = extractJSON(responseText);

    const aiResponse = await Recipe.create({
      meal: meal._id,
      title: recipe.title,
      servings: recipe.servings,
      totalTime: recipe.total_time,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      notes: recipe.notes,
    });

    return res.status(201).json({
      msg: "Meal created and recipe generated successfully",
      meal,
      recipe: aiResponse,
    });
  } catch (error) {
    console.error("❌ Error in createMeal:", error);
    return res.status(500).json({
      msg: "Something went wrong",
      error: error.message,
    });
  }
};

export const FetchMeal = async (req, res) => {
  try {
    const userId = req.user.id; // authenticated user's ID

    const meals = await Meal.find({ user: userId }); // filter by user field

    return res.status(200).json({ meals });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

export const GetRecipeByMealId = async (req, res) => {
  try {
    const mealId = req.params.mealId;
    const userId = req.user.id;

    // Verify the meal belongs to the user
    const meal = await Meal.findOne({ _id: mealId, user: userId });
    if (!meal) {
      return res.status(404).json({ msg: "Meal not found" });
    }

    // Get the recipe linked to this meal
    const recipe = await Recipe.findOne({ meal: mealId });

    if (!recipe) {
      return res.status(404).json({ msg: "Recipe not found" });
    }

    return res.status(200).json({ recipe });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
