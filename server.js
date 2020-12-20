const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const MOVIES = require("./movies-data.json");

const app = express();

app.use(morgan("dev"));
// app.use(helmet());
// app.use(cors());

function handleMovieRequest(req, res) {
  let response = MOVIES;

  if (req.query.genre) {
    if (typeof req.query.genre !== "string") {
      return res
        .status(400)
        .send("The genre parameter requires a string input.");
    }
    response = response.filter((movie) =>
      movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    );
  }

  if (req.query.country) {
    console.log(req.query.country);
    if (typeof req.query.country !== "string") {
      return res
        .status(400)
        .send("The country parameter requires a string input.");
    }
    response = response.filter((movie) =>
      movie.country.toLowerCase().includes(req.query.country.toLowerCase())
    );
  }

  if (req.query.avg_vote) {
    const avg_vote = parseFloat(req.query.avg_vote);

    if (avg_vote > 10 || avg_vote < 0 || isNaN(avg_vote)) {
      return res.status(400).send("Please provide a number between 0-10.");
    }
    response = response.filter((movie) => movie.avg_vote >= avg_vote);
  }

  res.json(response);
}

app.get("/movie", handleMovieRequest);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
