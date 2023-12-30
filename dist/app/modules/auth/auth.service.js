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
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("../user/user.model");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = payload;
    const user = yield user_model_1.UserModel.findOne({ username });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found !');
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordMatched)
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password do not matched');
    const jwtPayload = {
        username: user.username,
        role: user.role,
        email: user.email
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: "10d"
    });
    return {
        user,
        token: accessToken
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { currentPassword, newPassword } = payload;
    const userData = yield user_model_1.UserModel.findOne({ username: user.username });
    if (!userData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found!');
    }
    const isCurrentPasswordMatched = yield bcrypt_1.default.compare(currentPassword, userData === null || userData === void 0 ? void 0 : userData.password);
    if (!isCurrentPasswordMatched) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Current password does not match');
    }
    const passwordChangeHistory = (userData === null || userData === void 0 ? void 0 : userData.passwordChangeHistory) || [];
    const isPasswordInHistory = passwordChangeHistory.some((history) => bcrypt_1.default.compareSync(newPassword, history.password));
    if (isPasswordInHistory) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Password change failed. Cannot reuse previous passwords.');
    }
    const newHashedPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bcrypt_salt_rounds));
    // Update the user's password change history
    passwordChangeHistory.unshift({
        password: newHashedPassword,
        timestamp: new Date(),
    });
    // Keep only the last 2 passwords in the history
    const updatedHistory = passwordChangeHistory.slice(0, 2);
    // Update the user document using findOneAndUpdate
    const result = yield user_model_1.UserModel.findOneAndUpdate({ username: user.username }, {
        password: newHashedPassword,
        passwordChangeHistory: updatedHistory,
    }, { new: true });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to update user password');
    }
    // Optionally, you can return the updated user details
    const updatedUserDetails = {
        _id: result._id,
        username: result.username,
        email: result.email,
        role: result.role,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
    };
    return updatedUserDetails;
});
exports.AuthServices = {
    loginUser,
    changePassword
};
