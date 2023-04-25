require("./env.js");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");


const openaiRoute = require("./controller/openai.js");
const fileUploadRoute = require("./controller/fileupload.js");

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(express.json());

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
app.use("/api/v1/query", openaiRoute);
app.use("/api/v1/file", fileUploadRoute);

//server
const port = 8000 || process.env.PORT;
app.listen(port, () => {
  console.log("Server is listing on port " + port);
});

module.exports = app;
