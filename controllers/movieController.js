const MovieModel = require("../models/movieModel");

class MovieController {
  static async getAllMovies(req, res) {
    try {
      const movies = await MovieModel.getAllMovies();
      res.json({ movies });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getMovie(req, res) {
    try {
      const movie = await MovieModel.getMovieById(req.params.id);
      if (!movie) return res.status(404).json({ message: "Movie not found" });
      res.json(movie);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createMovie(req, res) {
    try {
      const movieData = req.body;
      if (
        movieData.poster &&
        !movieData.poster.match(/^data:image\/[a-z]+;base64,/)
      ) {
        return res
          .status(400)
          .json({
            error:
              "Poster must be a valid Data URI (e.g., data:image/jpeg;base64,...)",
          });
      }
      const result = await MovieModel.createMovie(movieData);
      res.status(201).json({ id: result.id, ...movieData });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateMovie(req, res) {
    try {
      const movieData = req.body;
      if (
        movieData.poster &&
        !movieData.poster.match(/^data:image\/[a-z]+;base64,/)
      ) {
        return res
          .status(400)
          .json({
            error:
              "Poster must be a valid Data URI (e.g., data:image/jpeg;base64,...)",
          });
      }
      await MovieModel.updateMovie(req.params.id, req.body);
      res.json({ message: "Movie updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteMovie(req, res) {
    try {
      await MovieModel.deleteMovie(req.params.id);
      res.json({ message: "Movie deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = MovieController;
