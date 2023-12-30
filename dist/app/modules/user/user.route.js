"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post("/auth/register", (0, validateRequest_1.default)(user_validation_1.userValidationSchema), user_controller_1.UserControllers.createUser);
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
exports.UserRoutes = router;
