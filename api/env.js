const { config } = require("dotenv");

const result = config();

if (result.error) {
  throw result.error;
}
