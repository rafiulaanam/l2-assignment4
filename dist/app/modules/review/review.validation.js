"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidationSchema = void 0;
const zod_1 = require("zod");
exports.reviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        rating: zod_1.z.number().int().min(1).max(5),
        review: zod_1.z.string().min(1),
    })
});
