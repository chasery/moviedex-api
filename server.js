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
    response = response.filter((movie) =>
      movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    );
  }

  if (req.query.country) {
    response = response.filter((movie) =>
      movie.country.toLowerCase().includes(req.query.country.toLowerCase())
    );
  }

  if (req.query.avg_vote) {
    // Do something to response
  }

  res.json(response);
}

app.get("/movie", handleMovieRequest);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
