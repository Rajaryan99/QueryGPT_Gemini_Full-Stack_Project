import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "Are semicolons optional in JavaScript?";

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
}

run();
