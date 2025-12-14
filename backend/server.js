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

  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'openai/gpt-4o-mini',
      messages: [
        {
          role: "user",
          content: req.body.messages
        }]
    })
  }


  try {
   const resopne = await fetch('https://openrouter.ai/api/v1/chat/completions', options);
   const data = await resopne.json();
   console.log(data);
   res.send(data)

  } catch (error) {
    console.log(error)

  }
})

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
})