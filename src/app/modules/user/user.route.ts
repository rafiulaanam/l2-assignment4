import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidationSchema } from "./user.validation";

const router = express.Router();

router.post(
  "/auth/register",
  validateRequest(userValidationSchema),
  UserControllers.createUser
);
// router.get("/courses", CourseControllers.getAllFilteredCourses);
// router.get(
//   "/courses/:courseId/reviews",
//   CourseControllers.getCoursesWithAllReview
// );
// router.put(
//   "/courses/:courseId",
//   validateRequest(courseUpdateValidationSchema),
//   CourseControllers.updateCourse
// );
// router.get("/course/best", CourseControllers.getBestCoursesByReview);

export const UserRoutes = router;
