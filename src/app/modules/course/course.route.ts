import express from "express";
import { CourseControllers } from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import { courseUpdateValidationSchema, courseValidationSchema } from "./course.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/courses",
  validateRequest(courseValidationSchema),
  auth(USER_ROLE.admin),
  CourseControllers.createCourse
);
router.get("/courses", CourseControllers.getAllFilteredCourses);
router.get(
  "/courses/:courseId/reviews",
  CourseControllers.getCoursesWithAllReview
);
router.put(
  "/courses/:courseId",
  validateRequest(courseUpdateValidationSchema),
  auth(USER_ROLE.admin),
  CourseControllers.updateCourse
);
router.get("/course/best", CourseControllers.getBestCoursesByReview);

export const CourseRoutes = router;
