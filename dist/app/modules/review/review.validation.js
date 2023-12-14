"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidationSchema = void 0;
const zod_1 = require("zod");
exports.reviewValidationSchema = zod_1.z.object({
    //   courseId: z.string().refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
    //     message: 'Invalid ObjectId format for courseId',
    //   }),
    rating: zod_1.z.number().int().min(1).max(5),
    review: zod_1.z.string().min(1),
});
