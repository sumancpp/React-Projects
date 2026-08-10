import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const bynaraApiKey = import.meta.env.VITE_BYNARA_API_KEY || import.meta.env.VITE_API_KEY || "";
const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

let bynaraClient = null;
if (bynaraApiKey && !bynaraApiKey.includes("your_bynara_api_key")) {
  bynaraClient = new OpenAI({
    baseURL: "https://router.bynara.id/v1",
    apiKey: bynaraApiKey,
    dangerouslyAllowBrowser: true,
  });
}

let geminiAI = null;
if (geminiApiKey && !geminiApiKey.includes("your_gemini_api_key")) {
  geminiAI = new GoogleGenerativeAI(geminiApiKey);
}

async function run(prompt, systemInstruction = "") {
  // 1. Try Bynara AI Router if API key is provided
  if (bynaraClient) {
    try {
      const messages = [];
      if (systemInstruction) {
        messages.push({ role: "system", content: systemInstruction });
      }
      messages.push({ role: "user", content: prompt });

      const response = await bynaraClient.chat.completions.create({
        model: "auto/bynara",
        messages: messages,
      });

      const reply = response?.choices?.[0]?.message?.content;
      if (reply && reply.trim()) {
        return reply.trim();
      }
    } catch (error) {
      const msg = error?.message || "";
      console.warn("[Bynara Router Error]:", msg);

      if (msg.includes("telegram_required")) {
        return "Please bind your Telegram account on bynara.id settings page to activate your API key.";
      }
    }
  }

  // 2. Fallback to Google Gemini API if key is provided
  if (geminiAI) {
    const modelNames = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro"];
    const combinedPrompt = systemInstruction ? `${systemInstruction}\n\n${prompt}` : prompt;

    for (const modelName of modelNames) {
      try {
        const model = geminiAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(combinedPrompt);
        const reply = result?.response?.text();
        if (reply && reply.trim()) {
          return reply.trim();
        }
      } catch (error) {
        console.warn(`[Gemini API Error] ${modelName}:`, error?.message || error);
      }
    }
  }

  // If no working API key is configured
  if (!bynaraApiKey && !geminiApiKey) {
    return "API Key is missing. Please configure VITE_BYNARA_API_KEY or VITE_GEMINI_API_KEY in your .env file.";
  }

  return "AI service is temporarily unavailable. Please verify your API key configuration in .env file.";
}

export default run;
