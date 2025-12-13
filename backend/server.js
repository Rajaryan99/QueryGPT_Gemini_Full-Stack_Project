import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'
import express from 'express';
import cors from 'cors'
import bodyParser from "body-parser";


const app = express();

const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.json());
app.use(cors());



app.get('/', (req, res) => {
  res.send("Hellow world, from Google Gemini");
})

app.post("/test", async (req, res) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: req.body.message || "Hello"
            }]
          }]
        })
      }
    );
    
    const data = await response.json();
    console.log("API Response:", JSON.stringify(data, null, 2));
    
    if (data.error) {
      return res.status(400).send({ error: data.error.message });
    }
    
    if (!data.candidates || !data.candidates[0]) {
      return res.status(500).send({ error: "No response from API" });
    }
    
    const text = data.candidates[0].content.parts[0].text;
    res.send({ result: text });
    
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ error: "Failed to generate content" });
  }
});


app.listen(PORT, () => {
  console.log(`surever is running on http://localhost:${PORT}`)
})