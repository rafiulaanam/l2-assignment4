import express from "express";
import { CategoryControllers } from "./category.controller";
import validateRequest from "../../middlewares/validateRequest";
import { categoryValidationSchema } from "./category.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post("/categories", validateRequest(categoryValidationSchema),
auth(USER_ROLE.admin),
CategoryControllers.createCategory);
router.get("/categories", CategoryControllers.getAllCategory);

export const CategoryRoutes = router;
