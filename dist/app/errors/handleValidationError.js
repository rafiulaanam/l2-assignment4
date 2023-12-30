"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const errorSources = Object.values(err.errors).map((val) => {
        return {
            path: val === null || val === void 0 ? void 0 : val.path,
            message: val === null || val === void 0 ? void 0 : val.message,
        };
    });
    const statusCode = 400;
    return {
        success: false,
        message: 'Validation Error',
        errorMessage: 'Validation failed. Please check the provided data.',
        statusCode,
        errorSources,
        errorDetails: {
            name: err.name,
            message: err.message,
        },
    };
};
exports.default = handleValidationError;
