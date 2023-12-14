"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_validation_1 = require("./category.validation");
const router = express_1.default.Router();
router.post("/categories", (0, validateRequest_1.default)(category_validation_1.categoryValidationSchema), category_controller_1.CategoryControllers.createCategory);
router.get("/categories", category_controller_1.CategoryControllers.getAllCategory);
exports.CategoryRoutes = router;
