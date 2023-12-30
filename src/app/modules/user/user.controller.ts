
import httpStatus from 'http-status';
import { UserServices } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';


const createUser = catchAsync(async (req, res) => {
    const result = await UserServices.createUserIntoDB(req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      // statusCode: 201,
      success: true,
      message: 'User is created successfully',
      data: result,
    });
  });





export const UserControllers = {
    createUser,
    
};
