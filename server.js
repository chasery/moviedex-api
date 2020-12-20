const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.get("/movies", (req, res) => {
  res.send(200, "You hit the nail on the head");
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
