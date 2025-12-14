import { OpenRouter } from "@openrouter/sdk";
import 'dotenv/config'
import express from 'express';
import bodyParser from "body-parser";


const app = express();
const PORT = process.env.PORT;


app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send("hey, this is openAI");
})




app.post('/test', async (req, res) => {

  
})

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
})