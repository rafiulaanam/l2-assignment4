import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from './error.interface';
const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    success: false,
    message: 'Invalid ID',
    errorMessage: `${err.value} is not a valid ID!`,
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
    stack: err.stack || '',
    statusCode,
    errorSources,
  };
};

export default handleCastError;
