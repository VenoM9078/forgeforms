import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

async function openAi(req, res) {
    
    const openai = new OpenAIApi(configuration);
    let response;
  
    try {
      response = await openai.createCompletion({
        model: "code-davinci-002",
        prompt:
          "### Postgres SQL tables, with their properties:\n#\n# Employee(id, name, department_id)\n# Department(id, name, address)\n# Salary_Payments(id, employee_id, amount, date)\n#\n### A query to list the names of the departments which employed more than 10 employees in the last 3 months\nSELECT",
        temperature: 0,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["#", ";"],
      });
    } catch (error) {
      console.log(error);
      response = "Error";
    }
  
    res.status(200).json({
      message: "success",
      data: response,
    });
  }

export default openAi;