// Utils/extractJSON.js
export const extractJSON = (text) => {
  if (!text || typeof text !== "string") {
    throw new Error("Invalid text input");
  }

  // Remove markdown code fences
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^```json\s*/i, "");
  cleaned = cleaned.replace(/^```\s*/, "");
  cleaned = cleaned.replace(/```\s*$/g, "");
  cleaned = cleaned.trim();

  // Parse JSON
  return JSON.parse(cleaned);
};