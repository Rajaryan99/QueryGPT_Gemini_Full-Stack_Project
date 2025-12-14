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
   const response = await fetch('https://openrouter.ai/api/v1/chat/completions', options);


   const data = await response.json();
  //  console.log(data.choices[0].message.content);
   res.send(data.choices[0].message.content)

  } 
  
  catch (error) {
    console.error(
      error.resopne?.data || error.messages
    );
    res.status(500).send("openRoute api error")

  }
})

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
})