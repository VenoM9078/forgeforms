import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import { config } from "dotenv";

import openAiController from './controller/openai.js';

config({
  path: "./process.env",
});

const app = express();

//Middle
app.use(cors());
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//routes
app.post("/api/v1/sql-query", openAiController);

//server
const port = 8000 || process.env.PORT;
app.listen(port, () => {
  console.log("Server is listing on port " + port);
});

export default app;
