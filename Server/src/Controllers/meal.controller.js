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
