import express from "express";
import { ReviewControllers } from "./review.controller";
import validateRequest from "../../middlewares/validateRequest";
import { reviewValidationSchema } from "./review.validation";

const router = express.Router();

router.post("/reviews", validateRequest(reviewValidationSchema),ReviewControllers.createReview);

export const ReviewRoutes = router;
