import { OpenRouter } from "@openrouter/sdk";
import 'dotenv/config'
import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";


const app = express();
const PORT = process.env.PORT;


app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send("hey, this is openAI");
})


const connectDB = async () => {
  
   await mongoose.connect(`${process.env.MONGODB_URL}`)
  .then(() => {
    console.log('DB connected successfully!')
  }) 
  .catch((err) => {
    console.log("Failed to connect with DB", err)
  })

}




app.post('/test', async (req, res) => {

  
})

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
  connectDB();
})