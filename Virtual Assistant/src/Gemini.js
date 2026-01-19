// let apikey = "AIzaSyB63Z7_hUslsRRZp_zvyQ215P56v2i7FyA"

import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI("Your API Key");

async function run(prompt) {
  const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

  let attempts = 3;
  while (attempts > 0) {
    try {
      const response = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      });
      return response.response.text();
    } catch (error) {
      if (error.message.includes("503")) {
        console.warn("Gemini overloaded. Retrying...");
        await new Promise((res) => setTimeout(res, 2000)); 
        attempts--;
      } else {
        throw error;
      }
    }
  }
  throw new Error("Failed after retries");
}

export default run; 
