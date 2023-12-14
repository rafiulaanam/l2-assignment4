"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseServices = void 0;
const review_model_1 = require("../review/review.model");
const course_model_1 = require("./course.model");
const createCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseModel.create(payload);
    return result;
});
const getCourseByIdWithReviewFromDB = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.CourseModel.findById(courseId);
    // Find reviews for the course
    const reviews = yield review_model_1.ReviewModel.find({ courseId: courseId });
    return {
        course: course,
        reviews: reviews,
    };
});
const getFilteredCoursesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract query parameters
    const { page = 1, limit = 10, sortBy, sortOrder, minPrice, maxPrice, tags, startDate, endDate, language, provider, durationInWeeks, level, } = query;
    // Convert page and limit to numbers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    // Construct filter object based on query parameters
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter = {};
    if (minPrice)
        filter.price = { $gte: parseFloat(minPrice) };
    if (maxPrice)
        filter.price = Object.assign(Object.assign({}, filter.price), { $lte: parseFloat(maxPrice) });
    if (tags)
        filter["tags.name"] = tags;
    if (startDate)
        filter.startDate = { $gte: startDate };
    if (endDate)
        filter.endDate = { $lte: endDate };
    if (language)
        filter.language = language;
    if (provider)
        filter.provider = provider;
    if (durationInWeeks)
        filter.durationInWeeks = parseInt(durationInWeeks, 10);
    if (level)
        filter["details.level"] = level;
    // Construct sort object based on sortBy and sortOrder
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sort = {};
    if (sortBy && sortOrder)
        sort[sortBy] = sortOrder === "asc" ? 1 : -1;
    // Fetch courses based on filters, sorting, and pagination
    const courses = yield course_model_1.CourseModel.find(filter)
        .sort(sort)
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);
    // Count total number of courses matching the filter
    const total = yield course_model_1.CourseModel.countDocuments(filter);
    // return courses
    return { meta: {
            page: pageNumber,
            limit: limitNumber,
            total: total,
        },
        courses };
});
const updateCoursesIntoDB = (courseId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedCourse = yield course_model_1.CourseModel.findByIdAndUpdate(courseId, payload, { new: true });
    return updatedCourse;
});
const getBestCourseFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.ReviewModel.aggregate([
        {
            $group: {
                _id: "$courseId",
                averageRating: { $avg: "$rating" },
                reviewCount: { $sum: 1 },
            },
        },
        {
            $sort: { averageRating: -1, reviewCount: -1 },
        },
        {
            $limit: 1,
        },
        {
            $lookup: {
                from: "courses", // Assuming your courses collection is named 'courses'
                localField: "_id",
                foreignField: "_id",
                as: "course",
            },
        },
        {
            $unwind: "$course",
        },
        {
            $project: {
                _id: "$course._id",
                title: "$course.title",
                instructor: "$course.instructor",
                categoryId: "$course.categoryId",
                price: "$course.price",
                tags: "$course.tags",
                startDate: "$course.startDate",
                endDate: "$course.endDate",
                language: "$course.language",
                provider: "$course.provider",
                durationInWeeks: "$course.durationInWeeks",
                details: "$course.details",
                averageRating: 1,
                reviewCount: 1,
            },
        },
    ]);
    const bestCourse = result[0];
    return {
        course: {
            _id: bestCourse._id,
            title: bestCourse.title,
            instructor: bestCourse.instructor,
            categoryId: bestCourse.categoryId,
            price: bestCourse.price,
            tags: bestCourse.tags,
            startDate: bestCourse.startDate,
            endDate: bestCourse.endDate,
            language: bestCourse.language,
            provider: bestCourse.provider,
            durationInWeeks: bestCourse.durationInWeeks,
            details: bestCourse.details,
        },
        averageRating: bestCourse.averageRating,
        reviewCount: bestCourse.reviewCount,
    };
});
exports.CourseServices = {
    createCourseIntoDB,
    getFilteredCoursesFromDB,
    updateCoursesIntoDB,
    getCourseByIdWithReviewFromDB,
    getBestCourseFromDB,
};
