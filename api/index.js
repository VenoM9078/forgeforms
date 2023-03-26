import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import { config } from "dotenv";

import openAi  from './controller/openai.js';

config({
  path: "./process.env",
});

const app = express();

//Middle
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
    extended: true,
  })
);

//routes
app.use("/api/v1/query", openAi);

//server
const port = 8000;
app.listen(port, () => {
  console.log("Server is listing on port " + port);
});

export default app;
