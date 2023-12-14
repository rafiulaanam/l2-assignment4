import express from "express";
import { CategoryControllers } from "./category.controller";
import validateRequest from "../../middlewares/validateRequest";
import { categoryValidationSchema } from "./category.validation";

const router = express.Router();

router.post("/categories", validateRequest(categoryValidationSchema),CategoryControllers.createCategory);
router.get("/categories", CategoryControllers.getAllCategory);

export const CategoryRoutes = router;
