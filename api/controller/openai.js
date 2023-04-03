import axios from "axios";

async function openAi(req, res) {

  const apiBody = {
    model: "text-davinci-003",
    prompt:
      "Write an SQL Query of this " +
      `"${req.body.query}"` +
      ". Also check this is a valid SQL query or not. If not - return the following: 'This is not a valid SQL query.' - If it is a valid query, then only return the resultant SQL Query.",
    temperature: 0.7,
    max_tokens: 120,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  try {
    const responce = await axios.post(
      "https://api.openai.com/v1/completions",
      JSON.stringify(apiBody),
      {
        headers: {
          Authorization: "Bearer " + process.env.OPENAI_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({
      message: "success",
      data: responce.data.choices[0].text,
    });
  } catch (error) {
    res.status(401).json({
      message: "fail",
      error: error.message,
    });
  }
}

export default openAi;
