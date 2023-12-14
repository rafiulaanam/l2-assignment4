"use strict";
// src/models/course.model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModel = void 0;
const mongoose_1 = require("mongoose");
const tagSchema = new mongoose_1.Schema({
    name: String,
    isDeleted: Boolean,
});
const courseDetailsSchema = new mongoose_1.Schema({
    level: String,
    description: String,
});
const courseSchema = new mongoose_1.Schema({
    title: String,
    instructor: String,
    categoryId: String,
    price: Number,
    tags: [tagSchema],
    startDate: String,
    endDate: String,
    language: String,
    provider: String,
    durationInWeeks: Number,
    details: courseDetailsSchema,
});
exports.CourseModel = (0, mongoose_1.model)('Course', courseSchema);
