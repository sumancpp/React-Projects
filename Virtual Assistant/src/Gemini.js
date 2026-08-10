import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const ai = new GoogleGenerativeAI(apiKey);

async function run(prompt, systemInstruction = "") {
  if (!apiKey) {
    console.error("Gemini API key is missing. Please set VITE_GEMINI_API_KEY in your .env file.");
    return "API Key is missing. Please configure VITE_GEMINI_API_KEY in your .env file.";
  }

  // Official Gemini model list in priority order
  const modelNames = [
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-1.5-pro",
    "gemini-1.0-pro",
  ];

  // Combine system instruction with user prompt for universal API compatibility
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
      console.warn(`[Gemini API] ${modelName} fallback triggered:`, error?.message || error);
    }
  }

  return "I'm receiving high traffic right now. Please try asking again in a moment.";
}

export default run;
