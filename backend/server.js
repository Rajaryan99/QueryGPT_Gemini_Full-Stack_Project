import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'
import  express from 'express';


const app = express();

const PORT =process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hellow world, from Google Gemini");
})

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
})


