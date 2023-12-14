"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    courseId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Course", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
});
exports.ReviewModel = (0, mongoose_1.model)("Review", reviewSchema);
