
import httpStatus from 'http-status';
import { CourseServices } from './course.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';


const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourseIntoDB(req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      // statusCode: 201,
      success: true,
      message: 'Course is created successfully',
      data: result,
    });
  });



const getAllFilteredCourses = catchAsync(async (req, res) => {
 
  const result = await CourseServices.getFilteredCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses is retrieved successfully',
    // meta:meta,
    data: result,
  });
});
const getCoursesWithAllReview = catchAsync(async (req, res) => {
  const {courseId} = req.params;
  const result = await CourseServices.getCourseByIdWithReviewFromDB(courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course and Reviews are retrieved successfully',
    data: result,
  });
});
const getBestCoursesByReview = catchAsync(async (req, res) => {
 
  const result = await CourseServices.getBestCourseFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Best Course is retrieved successfully',
    data: result,
  });
});

// const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
//   const result = await StudentServices.getAllStudentsFromDB(req.query);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Student are retrieved successfully',
//     data: result,
//   });
// });

const updateCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  

  const result = await CourseServices.updateCoursesIntoDB(courseId, req.body);
  

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is updated successfully',
    data: result,
  });
});

// const deleteStudent = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await StudentServices.deleteStudentFromDB(id);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Student is deleted successfully',
//     data: result,
//   });
// });

export const CourseControllers = {
    createCourse,
    getAllFilteredCourses,
    updateCourse,
    getCoursesWithAllReview,
    getBestCoursesByReview
};
