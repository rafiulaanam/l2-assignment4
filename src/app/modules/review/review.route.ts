import express from "express";
import { ReviewControllers } from "./review.controller";
import validateRequest from "../../middlewares/validateRequest";
import { reviewValidationSchema } from "./review.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/reviews",
  validateRequest(reviewValidationSchema),
  auth(USER_ROLE.user),
  ReviewControllers.createReview
);

export const ReviewRoutes = router;
