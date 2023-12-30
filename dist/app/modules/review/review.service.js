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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewServices = void 0;
// import { UserModel } from "../user/user.model";
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const review_model_1 = require("./review.model");
const createReviewIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.ReviewModel.create(payload);
    const createdByUser = yield user_model_1.UserModel.findById(payload.createdBy);
    if (!createdByUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
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
});
exports.ReviewServices = {
    createReviewIntoDB,
};
