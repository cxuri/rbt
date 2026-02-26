import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const API_KEY = "PASTE_YOUR_REAL_KEY_HERE";
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash"
});

app.post("/ask", async (req, res) => {
  try {
    const { message } = req.body;

    const result = await model.generateContent(message);
    const response = await result.response;

    res.json({ reply: response.text() });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI error" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
