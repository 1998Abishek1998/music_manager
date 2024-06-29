import { SafeParseReturnType, Schema } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ExtractedErrorsType } from '../types/shared';
import { ValidationFailedError } from '../utils/error';

export default (schema: Schema) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    let parsed = {} as SafeParseReturnType<any, any>;

    if (req.method.toUpperCase() === 'GET') {
      console.log('Incoming query params : ', req.query);
      parsed = schema.safeParse(req.query);
    } else {
      const notLogUrlArr = [
        '/users/login',
        '/users/reset-password',
        '/users/sign-up',
      ];

      if (!notLogUrlArr.includes(req.originalUrl)) console.log(JSON.stringify(req.body));
      parsed = schema.safeParse(req.body);
    }

    if (!parsed.success) {
      const errors = parsed.error.issues
        .map(issue => [issue.path.join('.'), issue.message])
        .reduce((acc, [key, msg]) => {
          if (key in acc) {
            acc[key].push(msg);
          } else {
            acc[key] = [msg];
          }
          return acc;
        }, {} as ExtractedErrorsType);

      throw new ValidationFailedError('validation failed', errors);
    }
    req.body = parsed.data;
    next();
  };
};
