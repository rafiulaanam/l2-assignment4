import httpStatus from "http-status";

import { TChangePassword, TLoginUser } from "./auth.interface";
import AppError from "../../errors/AppError";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config";
import { UserModel } from "../user/user.model";


const loginUser = async (payload: TLoginUser) => {
  const { username, password } =payload

  const user = await UserModel.findOne({username});

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  const isPasswordMatched = await bcrypt.compare(password, user?.password);

  if (!isPasswordMatched)
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');



  const jwtPayload = {
    username: user.username,
    role: user.role,
    email:user.email
  };
const accessToken = jwt.sign(jwtPayload,config.jwt_access_secret as string,{
  expiresIn:"10d"})


  return {
  user,
 token:accessToken}

};



const changePassword = async (user: JwtPayload, payload: TChangePassword) => {
  const { currentPassword, newPassword } = payload;
    const userData = await UserModel.findOne({ username: user.username });

    if (!userData) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

    const isCurrentPasswordMatched = await bcrypt.compare(currentPassword, userData?.password);

    if (!isCurrentPasswordMatched) {
      throw new AppError(httpStatus.FORBIDDEN, 'Current password does not match');
    }

    const passwordChangeHistory = userData?.passwordChangeHistory || [];

    const isPasswordInHistory = passwordChangeHistory.some(
      (history) => bcrypt.compareSync(newPassword, history.password)
    );

    if (isPasswordInHistory) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Password change failed. Cannot reuse previous passwords.');
    }

    const newHashedPassword = await bcrypt.hash(newPassword, Number(config.bcrypt_salt_rounds));

    // Update the user's password change history
    passwordChangeHistory.unshift({
      password: newHashedPassword,
      timestamp: new Date(),
    });

    // Keep only the last 2 passwords in the history
    const updatedHistory = passwordChangeHistory.slice(0, 2);

    // Update the user document using findOneAndUpdate
    const result = await UserModel.findOneAndUpdate(
      { username: user.username },
      {
        password: newHashedPassword,
        passwordChangeHistory: updatedHistory,
      },
      { new: true }
    );

    if (!result) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update user password');
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
};

export const AuthServices = {
  loginUser,
  changePassword
};

