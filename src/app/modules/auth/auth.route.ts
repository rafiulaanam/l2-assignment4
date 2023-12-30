import express from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { changePasswordValidationSchema, loginUserValidationSchema } from "./auth.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
    '/login',
    validateRequest(loginUserValidationSchema),
   
    AuthControllers.loginUser,
  );
router.post(
    '/change-password',
    validateRequest(changePasswordValidationSchema),
    auth(USER_ROLE.user,USER_ROLE.admin),
    AuthControllers.changeUserPassword,
  );

export const AuthRoutes = router;
