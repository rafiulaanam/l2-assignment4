import { ReviewModel } from "../review/review.model";
import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const getCourseByIdWithReviewFromDB = async (courseId: string) => {
  const course = await CourseModel.findById(courseId);

  // Find reviews for the course
  const reviews = await ReviewModel.find({ courseId: courseId });

  return {
    course: course,
    reviews: reviews,
  };
};

const getFilteredCoursesFromDB = async (query: Record<string, unknown>) => {
  // Extract query parameters
  const {
    page = 1,
    limit = 10,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    tags,
    startDate,
    endDate,
    language,
    provider,
    durationInWeeks,
    level,
  } = query;

  // Convert page and limit to numbers
  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  // Construct filter object based on query parameters
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: any = {};
  if (minPrice) filter.price = { $gte: parseFloat(minPrice as string) };
  if (maxPrice)
    filter.price = { ...filter.price, $lte: parseFloat(maxPrice as string) };
  if (tags) filter["tags.name"] = tags;
  if (startDate) filter.startDate = { $gte: startDate as string };
  if (endDate) filter.endDate = { $lte: endDate as string };
  if (language) filter.language = language as string;
  if (provider) filter.provider = provider as string;
  if (durationInWeeks)
    filter.durationInWeeks = parseInt(durationInWeeks as string, 10);
  if (level) filter["details.level"] = level as string;

  // Construct sort object based on sortBy and sortOrder
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sort: any = {};
  if (sortBy && sortOrder)
    sort[sortBy as string] = sortOrder === "asc" ? 1 : -1;

  // Fetch courses based on filters, sorting, and pagination
  const courses = await CourseModel.find(filter)
    .sort(sort)
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber);

  // Count total number of courses matching the filter
  const total = await CourseModel.countDocuments(filter);
// return courses
  return {meta: {
    page: pageNumber,
    limit: limitNumber,
    total: total,
  },
  courses}
 };
const updateCoursesIntoDB = async (
  courseId: string,
  payload: Partial<TCourse>
) => {


  const updatedCourse = await CourseModel.findByIdAndUpdate(
    courseId,
    payload,
    { new: true }
  );
 
return updatedCourse
};




const getBestCourseFromDB = async () => {
  const result = await ReviewModel.aggregate([
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
};

export const CourseServices = {
  createCourseIntoDB,
  getFilteredCoursesFromDB,
  updateCoursesIntoDB,
  getCourseByIdWithReviewFromDB,
  getBestCourseFromDB,
};
