const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class MovieModel {
  static getAllMovies() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM movies", [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }

  static getMovieById(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM movies WHERE id = ?", [id], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }

  static createMovie(movieData) {
    const id = uuidv4();
    const {
      title,
      poster,
      rating,
      votes,
      content_rating,
      languages,
      status,
      available_formats,
      length,
      genre,
      release_date,
      description,
    } = movieData;

    return new Promise((resolve, reject) => {
      db.run(
        `
        INSERT INTO movies (id, title, poster, rating, votes, content_rating, languages, 
          status, available_formats, length, genre, release_date, description)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
        [
          id,
          title,
          poster,
          rating,
          votes,
          content_rating,
          JSON.stringify(languages),
          status,
          JSON.stringify(available_formats),
          length,
          JSON.stringify(genre),
          release_date,
          description,
        ],
        (err) => {
          if (err) reject(err);
          resolve({ id });
        }
      );
    });
  }

  static updateMovie(id, movieData) {
    const fields = Object.keys(movieData)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(movieData);
    values.push(id);

    return new Promise((resolve, reject) => {
      db.run(`UPDATE movies SET ${fields} WHERE id = ?`, values, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  static deleteMovie(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM movies WHERE id = ?", [id], (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }
}

module.exports = MovieModel;
