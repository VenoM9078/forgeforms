const express = require("express");
const router = express.Router();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.post("/sql-query", async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `create an SQL query from the following natural language request: "${req.body.query}. If the request cannot be accurately converted into an SQL query, please suggest explanation and modifications to the request to make it compatible with the converter tool."`,
      temperature: 0.4,
      max_tokens: 64,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.status(200).json({
      message: "success",
      data: response.data.choices[0].text,
    });
  } catch (error) {
    res.status(401).json({
      message: "fail",
      error: error.message,
    });
  }
});

module.exports = router;