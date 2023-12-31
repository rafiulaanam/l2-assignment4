import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  // const { refreshToken, accessToken, needsPasswordChange } = result;

  // res.cookie('refreshToken', refreshToken, {
  //   secure: config.NODE_ENV === 'production',
  //   httpOnly: true,
  // });
  const formattedResponse = {
    user: {
      _id: result.user._id,
      username: result.user.username,
      email: result.user.email,
      role: result.user.role,
    },
    token: result.token,
  };
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully!',
    data: formattedResponse,
  });
});
const changeUserPassword = catchAsync(async (req, res) => {
  
  const result = await AuthServices.changePassword(req.user,req.body);
 

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
    data: result,
  });
});


  export const AuthControllers = {
    loginUser,
    changeUserPassword

};
