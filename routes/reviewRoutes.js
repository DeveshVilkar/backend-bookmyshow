const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/reviewController");

router.delete("/:id", ReviewController.deleteReview);
router.post("/:id/like", ReviewController.likeReview);
router.post("/:id/dislike", ReviewController.dislikeReview);

module.exports = router;
