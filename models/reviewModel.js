const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class ReviewModel {
  static createReview(movieId, reviewData) {
    const id = uuidv4();
    const { user_id, rating, hashtags, review_text } = reviewData;

    return new Promise((resolve, reject) => {
      db.run(
        `
        INSERT INTO reviews (id, movie_id, user_id, rating, hashtags, review_text)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
        [id, movieId, user_id, rating, JSON.stringify(hashtags), review_text],
        (err) => {
          if (err) reject(err);
          resolve({ id });
        }
      );
    });
  }

  static deleteReview(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM reviews WHERE id = ?", [id], (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  static getReviewsByMovieId(movieId) {
    return new Promise((resolve, reject) => {
      db.all(
        `
        SELECT id, user_id, rating, hashtags, review_text, posted_date, likes, dislikes
        FROM reviews
        WHERE movie_id = ?
      `,
        [movieId],
        (err, rows) => {
          if (err) reject(err);
          const reviews = rows.map((review) => ({
            ...review,
            hashtags: JSON.parse(review.hashtags || "[]"),
          }));
          resolve(reviews);
        }
      );
    });
  }

  static getReviewCountByMovieId(movieId) {
    return new Promise((resolve, reject) => {
      db.get(
        `
        SELECT COUNT(*) as total
        FROM reviews
        WHERE movie_id = ?
      `,
        [movieId],
        (err, row) => {
          if (err) reject(err);
          resolve(row.total);
        }
      );
    });
  }

  static incrementLikes(reviewId) {
    return new Promise((resolve, reject) => {
      db.run(
        `
        UPDATE reviews SET likes = likes + 1 WHERE id = ?
      `,
        [reviewId],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static incrementDislikes(reviewId) {
    return new Promise((resolve, reject) => {
      db.run(
        `
        UPDATE reviews SET dislikes = dislikes + 1 WHERE id = ?
      `,
        [reviewId],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static getReviewById(reviewId) {
    return new Promise((resolve, reject) => {
      db.get(
        `
        SELECT likes, dislikes
        FROM reviews
        WHERE id = ?
      `,
        [reviewId],
        (err, row) => {
          if (err) reject(err);
          resolve(row);
        }
      );
    });
  }
}

module.exports = ReviewModel;
