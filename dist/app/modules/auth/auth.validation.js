"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordValidationSchema = exports.loginUserValidationSchema = void 0;
const zod_1 = require("zod");
exports.loginUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string(),
        password: zod_1.z.string(),
    })
});
exports.changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        currentPassword: zod_1.z.string(),
        newPassword: zod_1.z.string(),
    })
});
