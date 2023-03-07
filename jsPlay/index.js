const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: process.env.REACT_APP_GPT_API_KEY,
});

const openai = new OpenAIApi(config);

// setup Server
const app = express();
app.use(bodyParser.json());
app.use(cors());

// chatGPT endpoint
app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 512,
    temperature: 1,
    prompt: prompt,
  });

  res.send(completion.data.choices[0].text);
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
