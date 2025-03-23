const ReviewModel = require("../models/reviewModel");

const VALID_HASHTAGS = [
  "#GoodActing",
  "#NiceStory",
  "#GreatDirection",
  "#AwesomeMusic",
  "#BadPlot",
  "#AmazingVisuals",
  "#PoorEditing",
  "#MustWatch",
];

class ReviewController {
  static async createReview(req, res) {
    try {
      const reviewData = req.body;
      const result = await ReviewModel.createReview(req.params.id, reviewData);
      res.status(201).json({ id: result.id, ...reviewData });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteReview(req, res) {
    try {
      await ReviewModel.deleteReview(req.params.id);
      res.json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getMovieReviews(req, res) {
    try {
      const movieId = req.params.id;
      const reviews = await ReviewModel.getReviewsByMovieId(movieId);
      const totalReviews = await ReviewModel.getReviewCountByMovieId(movieId);

      const formattedReviews = reviews.map((review) => ({
        id: review.id,
        user_id: review.user_id,
        rating: review.rating,
        // hashtags: JSON.parse(review.hashtags).filter((tag) =>
        //   VALID_HASHTAGS.includes(tag)
        // ),
        hashtags: review.hashtags.filter((tag) => VALID_HASHTAGS.includes(tag)),
        review_text: review.review_text,
        posted_date: review.posted_date,
        likes: review.likes,
        dislikes: review.dislikes,
      }));

      res.json({
        total_reviews: totalReviews,
        reviews: formattedReviews,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async likeReview(req, res) {
    try {
      await ReviewModel.incrementLikes(req.params.id);
      const review = await ReviewModel.getReviewById(req.params.id);
      if (!review) return res.status(404).json({ error: "Review not found" });
      res.json({ likes: review.likes, dislikes: review.dislikes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async dislikeReview(req, res) {
    try {
      await ReviewModel.incrementDislikes(req.params.id);
      const review = await ReviewModel.getReviewById(req.params.id);
      if (!review) return res.status(404).json({ error: "Review not found" });
      res.json({ likes: review.likes, dislikes: review.dislikes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ReviewController;
