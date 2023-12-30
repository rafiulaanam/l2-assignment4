"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseUpdateValidationSchema = exports.courseValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.courseValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string().optional(),
        instructor: zod_1.default.string().optional(),
        categoryId: zod_1.default.string().optional(),
        price: zod_1.default.number(),
        tags: zod_1.default.array(zod_1.default.object({
            name: zod_1.default.string().optional(),
            isDeleted: zod_1.default.boolean(),
        })),
        startDate: zod_1.default.string().optional(),
        endDate: zod_1.default.string().optional(),
        language: zod_1.default.string().optional(),
        provider: zod_1.default.string().optional(),
        createdBy: zod_1.default.string().optional(),
        details: zod_1.default.object({
            level: zod_1.default.string().optional(),
            description: zod_1.default.string().optional(),
        }),
    })
});
exports.courseUpdateValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string().optional(),
        instructor: zod_1.default.string().optional(),
        price: zod_1.default.number().optional(),
        tags: zod_1.default.array(zod_1.default.object({
            name: zod_1.default.string().optional(),
            isDeleted: zod_1.default.boolean().optional(),
        })).optional(),
        startDate: zod_1.default.string().optional(),
        endDate: zod_1.default.string().optional(),
        language: zod_1.default.string().optional(),
        provider: zod_1.default.string().optional(),
        details: zod_1.default.object({
            level: zod_1.default.string().optional(),
            description: zod_1.default.string().optional(),
        }).optional(),
    })
});
