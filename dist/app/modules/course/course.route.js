"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const course_controller_1 = require("./course.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const course_validation_1 = require("./course.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post("/courses", (0, validateRequest_1.default)(course_validation_1.courseValidationSchema), (0, auth_1.default)(user_constant_1.USER_ROLE.admin), course_controller_1.CourseControllers.createCourse);
router.get("/courses", course_controller_1.CourseControllers.getAllFilteredCourses);
router.get("/courses/:courseId/reviews", course_controller_1.CourseControllers.getCoursesWithAllReview);
router.put("/courses/:courseId", (0, validateRequest_1.default)(course_validation_1.courseUpdateValidationSchema), (0, auth_1.default)(user_constant_1.USER_ROLE.admin), course_controller_1.CourseControllers.updateCourse);
router.get("/course/best", course_controller_1.CourseControllers.getBestCoursesByReview);
exports.CourseRoutes = router;
