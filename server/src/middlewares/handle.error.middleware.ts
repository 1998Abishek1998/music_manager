import { ErrorRequestHandler, Response, Request, NextFunction } from 'express';
import StatusCodes from 'http-status-codes';
import { ExtractedErrorsType } from '../types/shared';
import { CustomError, DuplicateRowError, UnexpectedError, ValidationFailedError } from '../utils/error';

interface JsonResponse {
  failed: boolean;
  message: string;
  message_1: string;
  errors?: ExtractedErrorsType;
}

const handleError: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (!(err instanceof CustomError) || err instanceof UnexpectedError) {
    console.error(err);  // Logging the error
  }


  const payload: JsonResponse = {
    failed: true,
    message: err.message,
    message_1: err.message
  };

  if (err instanceof ValidationFailedError) {
    payload.errors = err.errors;
    payload.message_1 = err.errors[Object.keys(err.errors)[0]][0];
  }

  if (err instanceof DuplicateRowError) {
    payload.errors = {
      [err.key]: [`${err.key} already used`],
    };
    payload.message_1 = `${err.key} already used`;
  }

  const status = err instanceof CustomError ? err.httpStatus : StatusCodes.INTERNAL_SERVER_ERROR;
  console.log(status, payload);
  res.status(status);
  res.json(payload);
};

export default handleError;
