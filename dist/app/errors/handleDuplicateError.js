"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err) => {
    // Extract value within double quotes using regex
    const match = err.message.match(/"([^"]*)"/);
    // The extracted value will be in the first capturing group
    const extractedMessage = match && match[1];
    const errorSources = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    ;
    const statusCode = 400;
    return {
        success: false,
        message: 'Duplicate Entry',
        errorMessage: `${extractedMessage} is already exists`,
        statusCode,
        errorSources,
        errorDetails: {
            stringValue: err.value,
            valueType: err.kind,
            kind: err.kind,
            value: err.value,
            path: err.path,
            reason: err.reason || {},
            name: err.name,
            message: err.message,
        },
    };
};
exports.default = handleDuplicateError;
