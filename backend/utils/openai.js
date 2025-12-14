import 'dotenv/config'

const getOpenAIAPIResponse = async(message) => {
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
          content: message
        }]
    })
  }


  try {
   const response = await fetch('https://openrouter.ai/api/v1/chat/completions', options);


   const data = await response.json();
  //  console.log(data.choices[0].message.content);
   return (data.choices[0].message.content)

  } 
  
  catch (error) {
    console.error(
      error.resopne?.data || error.messages
    );
    res.status(500).send("openRoute api error")

  }
}