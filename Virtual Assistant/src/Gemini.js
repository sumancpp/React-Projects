import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const ai = new GoogleGenerativeAI(apiKey);

async function run(prompt, systemInstruction = "") {
  if (!apiKey || apiKey.trim() === "" || apiKey.includes("your_gemini_api_key")) {
    console.error("Gemini API key is missing. Please set VITE_GEMINI_API_KEY in your .env file.");
    return "API Key is missing. Please add a valid VITE_GEMINI_API_KEY to your .env file.";
  }

  const modelNames = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro"];

  const combinedPrompt = systemInstruction
    ? `${systemInstruction}\n\n${prompt}`
    : prompt;

  for (const modelName of modelNames) {
    try {
      const model = ai.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(combinedPrompt);
      const reply = result?.response?.text();

      if (reply && reply.trim()) {
        return reply.trim();
      }
    } catch (error) {
      const msg = error?.message || "";

      if (msg.includes("API_KEY_INVALID") || msg.includes("API key not valid")) {
        console.error("Gemini API key is invalid.");
        return "Your Gemini API key is invalid. Please get a valid key from Google AI Studio and update your .env file.";
      }

      if (msg.includes("Quota exceeded") || msg.includes("quota")) {
        console.warn(`Quota exceeded for ${modelName}. Trying next model...`);
      } else {
        console.warn(`[Gemini API] ${modelName} error:`, msg);
      }
    }
  }

  return "Gemini API quota exceeded or unavailable. Please get a fresh free API key from Google AI Studio and update your .env file.";
}

export default run;

