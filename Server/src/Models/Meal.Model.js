import mongoose from "mongoose";

const { Schema } = mongoose;

const mealSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    mealName: {
      type: String,
      required: true,
    },
    serving: {
      type: Number,
      default: 2,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const recipe = new Schema({
  mealName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Meal",
  },
  title: String,
  servings: Number,
  totalTime: String,
  ingredients: [String],
  instructions: [String],
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Meal = mongoose.model("Meal", mealSchema);
const Recipe = mongoose.model("Recipe", recipe);

export { Meal, Recipe };
