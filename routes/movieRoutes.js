const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movieController");
const ReviewController = require("../controllers/reviewController");
const { isAdmin } = require("../middleware/auth");

router.get("/", MovieController.getAllMovies);
router.get("/:id", MovieController.getMovie);
router.post("/", isAdmin, MovieController.createMovie);
router.put("/:id", isAdmin, MovieController.updateMovie);
router.delete("/:id", isAdmin, MovieController.deleteMovie);
router.post("/:id/reviews", ReviewController.createReview);
router.get("/:id/reviews", ReviewController.getMovieReviews);

module.exports = router;
