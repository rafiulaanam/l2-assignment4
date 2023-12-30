import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from './error.interface';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    // Extracting the last element of the path array for better clarity
    const path = issue?.path[issue.path.length - 1];
    
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

export default handleZodError;
