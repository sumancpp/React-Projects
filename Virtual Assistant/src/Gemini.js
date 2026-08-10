import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const ai = new GoogleGenerativeAI(apiKey);

async function run(prompt, systemInstruction = "") {
  if (!apiKey) {
    console.error("Gemini API key is missing. Please set VITE_GEMINI_API_KEY in your .env file.");
    return "API Key is missing. Please configure VITE_GEMINI_API_KEY in your .env file.";
  }

  // Model fallback list for resilience
  const modelNames = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-2.5-flash"];

  for (const modelName of modelNames) {
    let attempts = 2;
    while (attempts > 0) {
      try {
        const modelOptions = { model: modelName };
        if (systemInstruction) {
          modelOptions.systemInstruction = systemInstruction;
        }

        const model = ai.getGenerativeModel(modelOptions);
        const response = await model.generateContent({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        });

        const reply = response.response.text();
        if (reply) return reply;
      } catch (error) {
        console.warn(`Model ${modelName} attempt failed:`, error.message || error);
        if (error.message && (error.message.includes("503") || error.message.includes("429"))) {
          await new Promise((res) => setTimeout(res, 1500));
          attempts--;
        } else {
          // If model is not found or unsupported, break inner loop to try next model in fallback list
          break;
        }
      }
    }
  }

  throw new Error("Gemini AI failed after multiple model retries.");
}

export default run;
 
