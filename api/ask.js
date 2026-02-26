import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
    }

    const { message } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Invalid message" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: message
    });

    return res.status(200).json({
      reply: response.text
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    return res.status(500).json({
      error: error.message
    });
  }
}
