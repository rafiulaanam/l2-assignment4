
import httpStatus from 'http-status';
import { UserServices } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';


const createUser = catchAsync(async (req, res) => {
    const result = await UserServices.createUserIntoDB(req.body);
  
    const formattedResponse = {
      _id: result._id,
      username: result.username,
      email: result.email,
      role: result.role,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      // statusCode: 201,
      success: true,
      message: 'User registered successfully',
      data: formattedResponse,
    });
  });





export const UserControllers = {
    createUser,
    
};
