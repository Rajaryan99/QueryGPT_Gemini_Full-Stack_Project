import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'


const ai = new GoogleGenAI({
  apikey : process.env.GEMINI_API_KEY
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

await main();
