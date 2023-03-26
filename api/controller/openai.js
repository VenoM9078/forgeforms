import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

async function openAi(req, res) {
    
    const openai = new OpenAIApi(configuration);
    let response;
  
    try {
      response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Create a SQL request to find all users who live in California and have over 1000 credits:",
        temperature: 0.3,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });
    } catch (error) {
      return res.status(401).json({
        message: 'error',
        response: error
      })
    }
  
    res.status(200).json({
      message: "success",
      data: response.data,
    });
  }

export default openAi;