import { OpenRouter } from "@openrouter/sdk";
import 'dotenv/config'

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const stream = await openrouter.chat.send({
  model: "openai/gpt-4o-mini",
  messages: [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "AI replace the programmer?"
        },
       
      ]
    }
  ],
  stream: true
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content;
  if (content) {
    process.stdout.write(content);
  }
}