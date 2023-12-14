import express from "express";
import { CourseControllers } from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import { courseValidationSchema } from "./course.validation";

const router = express.Router();

router.post(
  "/course",
  validateRequest(courseValidationSchema),
  CourseControllers.createCourse
);
router.get("/courses", CourseControllers.getAllFilteredCourses);
router.get(
  "/courses/:courseId/reviews",
  CourseControllers.getCoursesWithAllReview
);
router.put("/courses/:courseId",validateRequest(courseValidationSchema), CourseControllers.updateCourse);
router.get("/course/best", CourseControllers.getBestCoursesByReview);

export const CourseRoutes = router;
