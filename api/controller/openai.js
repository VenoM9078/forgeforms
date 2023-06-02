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
      prompt: `"${req.body.query}.`,
      temperature: 0.4,
      max_tokens: 1000,
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
