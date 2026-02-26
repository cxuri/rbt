import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // Allow only POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Check environment variable
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
    }

    // Validate request body
    const { message } = req.body || {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Invalid message input" });
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    // Generate AI response
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({
      reply: text
    });

  } catch (error) {
    console.error("API ERROR:", error);

    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message
    });
  }
}
