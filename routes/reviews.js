const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsyncs");
const reviews = require("../controllers/review");
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware");



router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))


module.exports = router;