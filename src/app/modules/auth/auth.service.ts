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


// const changePassword = async (user: JwtPayload,payload: TChangePassword) => {
//   const { currentPassword, newPassword } =payload
//   const userData = await UserModel.findOne({username:user.username});

//   if (!userData) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
//   }
//   const isCurrentPasswordMatched = await bcrypt.compare(currentPassword, userData?.password);

//   if (!isCurrentPasswordMatched) {
//     throw new AppError(httpStatus.FORBIDDEN, 'Current password does not match');
//   }
//   const passwordChangeHistory = userData?.passwordChangeHistory || [];


//   const isPasswordInHistory = passwordChangeHistory.some(
//     (history) => bcrypt.compareSync(newPassword, history.password)
//   );

// if (isPasswordInHistory) {
//   throw new AppError(httpStatus.BAD_REQUEST, 'Password change failed. Cannot reuse previous passwords.');
// }

// const newHashedPassword = await bcrypt.hash(newPassword, Number(config.bcrypt_salt_rounds));
// userData.password = newHashedPassword
// // Store the new password in the password change history
//  passwordChangeHistory.unshift({
//   password: newHashedPassword,
//   timestamp: new Date()
// });
// // Keep only the last 2 passwords in the history
//  passwordChangeHistory.slice(0, 2);

// // Save the updated user document

//   const result = UserModel.findOneAndUpdate({
//     username:userData.username,
//     role:userData.role,
//     email:userData.email,
  
//   },
//   {
//     password: newHashedPassword,
//     passwordChangeHistory
//   })

//   await userData.save();

//   // Optionally, you can return the updated user details
//   return result
// }
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
    timestamp: new Date()
  });

  // Keep only the last 2 passwords in the history
  userData.passwordChangeHistory = passwordChangeHistory.slice(0, 2);

  // Save the updated user document
  userData.password = newHashedPassword;

  await userData.save();

  // Optionally, you can return the updated user details
  return {
    _id: userData._id,
    username: userData.username,
    email: userData.email,
    role: userData.role,
    createdAt: userData.createdAt,
    updatedAt: userData.updatedAt
  };
};

export const AuthServices = {
  loginUser,
  changePassword
};

