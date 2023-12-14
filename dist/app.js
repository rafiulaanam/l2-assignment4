"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const category_route_1 = require("./app/modules/category/category.route");
const course_route_1 = require("./app/modules/course/course.route");
const review_route_1 = require("./app/modules/review/review.route");
const globalErrorhandler_1 = __importDefault(require("./app/middlewares/globalErrorhandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', course_route_1.CourseRoutes);
app.use('/api', category_route_1.CategoryRoutes);
app.use('/api', review_route_1.ReviewRoutes);
app.get('/', (req, res) => {
    res.send('Server is Running');
});
app.use(globalErrorhandler_1.default);
app.use(notFound_1.default);
exports.default = app;
