"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseUpdateValidationSchema = exports.userValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        username: zod_1.default.string().min(3).max(30),
        email: zod_1.default.string().email(),
        password: zod_1.default.string().min(8),
        role: zod_1.default.enum(['user', 'admin']).default('user'),
        createdAt: zod_1.default.date().optional(),
        updatedAt: zod_1.default.date().optional(),
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
