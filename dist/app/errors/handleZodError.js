"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const errorSources = err.issues.map((issue) => {
        // Extracting the last element of the path array for better clarity
        const path = issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1];
        return {
            path,
            message: issue.message,
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
            issues: err.issues,
            name: err.name,
        },
    };
};
exports.default = handleZodError;
