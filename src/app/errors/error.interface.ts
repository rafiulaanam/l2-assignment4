
export type TErrorSources = {
    path: string | number;
    message: string;
  }[];
  
   export type TGenericErrorResponse = {
    success:boolean;
    statusCode: number;
    message: string;
    errorMessage: string;
    stack?: string;
    errorDetails:object
    errorSources: TErrorSources;
  };
  
  