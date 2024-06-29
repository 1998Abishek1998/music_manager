import HttpStatusCodes from 'http-status-codes';
import { ExtractedErrorsType } from '../types/shared';

export abstract class CustomError extends Error {
  public readonly httpStatus = HttpStatusCodes.BAD_REQUEST;

  constructor(msg: string, httpStatus: number) {
    super(msg);
    this.httpStatus = httpStatus;
  }
}

export class UnexpectedError extends CustomError {
  public static readonly status = HttpStatusCodes.INTERNAL_SERVER_ERROR;

  constructor(msg = 'Something went wrong Please try again later.') {
    super(msg, UnexpectedError.status);
  }
}

export class UnauthorizedError extends CustomError {
  public static readonly msg = 'Unauthorized, Please LOGIN to continue';
  public static readonly status = HttpStatusCodes.UNAUTHORIZED;

  constructor(msg: string = UnauthorizedError.msg) {
    super(msg, UnauthorizedError.status);
  }
}

export class ForbiddenError extends CustomError {
  public static readonly msg = 'You are not authorized to use this feature.';
  public static readonly status = HttpStatusCodes.FORBIDDEN;

  constructor(msg: string = ForbiddenError.msg) {
    super(msg, ForbiddenError.status);
  }
}

export class NotFoundError extends CustomError {
  public static readonly msg = '404 not found';
  public static readonly status = HttpStatusCodes.NOT_FOUND;

  constructor(msg: string = NotFoundError.msg) {
    super(msg, NotFoundError.status);
  }
}

export class ValidationFailedError extends CustomError {
  public static readonly msg = '422 Validation Failed';
  public static readonly status = HttpStatusCodes.UNPROCESSABLE_ENTITY;

  constructor(msg = '422 Validation Failed', public errors: ExtractedErrorsType) {
    super(msg, ValidationFailedError.status);
  }
}

export class BadRequestError extends CustomError {
  public static readonly msg = '400 Bad Request';
  public static readonly status = HttpStatusCodes.BAD_REQUEST;

  constructor(msg = '400 Bad Request') {
    super(msg, ValidationFailedError.status);
  }
}

export class FcmSubscribeError extends CustomError {
  public static readonly msg = '400 Bad Request';
  public static readonly status = HttpStatusCodes.CONFLICT;

  constructor(msg = '400 Bad Request') {
    super(msg, FcmSubscribeError.status);
  }
}

export class DuplicateRowError extends CustomError {
  public static readonly msg = '406 Duplication Error';
  public static readonly status = HttpStatusCodes.NOT_ACCEPTABLE;
  public key: string;

  constructor(msg = '406 Duplication Error', key: string) {
    super(msg, DuplicateRowError.status);
    this.key = key;
  }
}
