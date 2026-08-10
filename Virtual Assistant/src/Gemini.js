import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY || "";
const bynaraApiKey = import.meta.env.VITE_BYNARA_API_KEY || "";

// Official Gemini Client
let geminiAI = null;
if (geminiApiKey && !geminiApiKey.includes("your_gemini_api_key")) {
  geminiAI = new GoogleGenerativeAI(geminiApiKey);
}

// Official OpenAI Client
let openaiClient = null;
if (openaiApiKey && !openaiApiKey.includes("your_openai_api_key")) {
  openaiClient = new OpenAI({
    apiKey: openaiApiKey,
    dangerouslyAllowBrowser: true,
  });
}

// Bynara AI Router Client
let bynaraClient = null;
if (bynaraApiKey && !bynaraApiKey.includes("your_bynara_api_key")) {
  bynaraClient = new OpenAI({
    baseURL: "https://router.bynara.id/v1",
    apiKey: bynaraApiKey,
    dangerouslyAllowBrowser: true,
  });
}

async function run(prompt, systemInstruction = "") {
  // 1. Try Google Gemini API (gemini-flash-latest & gemini-flash-lite-latest)
  if (geminiAI) {
    const modelNames = [
      "gemini-flash-latest",
      "gemini-flash-lite-latest",
      "gemini-2.0-flash",
      "gemini-1.5-flash",
    ];
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

  // 2. Try Official OpenAI GPT API
  if (openaiClient) {
    try {
      const messages = [];
      if (systemInstruction) {
        messages.push({ role: "system", content: systemInstruction });
      }
      messages.push({ role: "user", content: prompt });

      const response = await openaiClient.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messages,
      });

      const reply = response?.choices?.[0]?.message?.content;
      if (reply && reply.trim()) {
        return reply.trim();
      }
    } catch (error) {
      console.warn("[OpenAI GPT Error]:", error?.message || error);
    }
  }

  // 3. Try Bynara AI Router
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
      console.warn("[Bynara Router Error]:", error?.message || error);
    }
  }

  // Fallback error message
  if (!geminiApiKey && !openaiApiKey && !bynaraApiKey) {
    return "API key is missing. Please configure VITE_GEMINI_API_KEY in your .env file.";
  }

  return "AI service is currently unavailable. Please verify your API key in .env file.";
}

export default run;
