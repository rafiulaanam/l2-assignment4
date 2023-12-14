"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.courseValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string(),
        instructor: zod_1.default.string(),
        categoryId: zod_1.default.string(),
        price: zod_1.default.number(),
        tags: zod_1.default.array(zod_1.default.object({
            name: zod_1.default.string(),
            isDeleted: zod_1.default.boolean(),
        })),
        startDate: zod_1.default.string(),
        endDate: zod_1.default.string(),
        language: zod_1.default.string(),
        provider: zod_1.default.string(),
        durationInWeeks: zod_1.default.number(),
        details: zod_1.default.object({
            level: zod_1.default.string(),
            description: zod_1.default.string(),
        }),
    })
});
