import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY || "";
const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const bynaraApiKey = import.meta.env.VITE_BYNARA_API_KEY || "";

// Official OpenAI Client
let openaiClient = null;
if (openaiApiKey && !openaiApiKey.includes("your_openai_api_key")) {
  openaiClient = new OpenAI({
    apiKey: openaiApiKey,
    dangerouslyAllowBrowser: true,
  });
}

// Official Gemini Client
let geminiAI = null;
if (geminiApiKey && !geminiApiKey.includes("your_gemini_api_key")) {
  geminiAI = new GoogleGenerativeAI(geminiApiKey);
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
  // 1. Official OpenAI GPT API (gpt-4o-mini / gpt-3.5-turbo)
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
      const msg = error?.message || "";
      if (msg.includes("Incorrect API key") || msg.includes("invalid_api_key")) {
        return "Your OpenAI API Key is invalid. Please check VITE_OPENAI_API_KEY in your .env file.";
      }
      if (msg.includes("quota") || msg.includes("rate_limit")) {
        return "OpenAI account quota exceeded. Please check your billing at platform.openai.com.";
      }
    }
  }

  // 2. Official Google Gemini API
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

  // 3. Bynara AI Router
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

  // If no working API key is configured
  if (!openaiApiKey && !geminiApiKey && !bynaraApiKey) {
    return "API Key is missing. Please set VITE_OPENAI_API_KEY or VITE_GEMINI_API_KEY in your .env file.";
  }

  return "AI service is temporarily unavailable. Please verify your API key in .env file.";
}

export default run;
