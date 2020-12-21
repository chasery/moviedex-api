require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const MOVIES = require("./movies-data.json");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get("Authorization");

  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unautorized request" });
  }

  next();
});

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
    const avg_vote = Number(req.query.avg_vote);

    if (avg_vote > 10 || avg_vote < 0 || isNaN(avg_vote)) {
      return res.status(400).send("Please provide a number between 0-10.");
    }
    response = response.filter((movie) => Number(movie.avg_vote) >= avg_vote);
  }

  res.json(response);
}

app.get("/movie", handleMovieRequest);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
