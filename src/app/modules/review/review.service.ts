// import { UserModel } from "../user/user.model";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { TReview } from "./review.interface";
import { ReviewModel } from "./review.model";

const createReviewIntoDB = async (payload: TReview) => {

  const result = await ReviewModel.create(payload)
  
  const createdByUser = await UserModel.findById(payload.createdBy);

  if (!createdByUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const response = {
    _id: result._id,
    courseId: result.courseId,
    rating: result.rating,
    review: result.review,
    createdBy: {
      _id: createdByUser._id,
      username: createdByUser.username,
      email: createdByUser.email,
      role: createdByUser.role,
    },
    createdAt: result.createdAt,
      updatedAt: result.updatedAt,
  };
  return response;
};

export const ReviewServices = {
  createReviewIntoDB,
};
