import { Request, Response, NextFunction } from 'express';
import instanceConfig from '../configs/instance.config';
import { CurrentUserKey } from './check-session.middleware';
import { ForbiddenError } from '../utils/error';
import { Role } from '../models/users.model';

const canAccess = (...permissions: Role[]) =>
  (_req: Request, _res: Response, next: NextFunction) => {
    const user = instanceConfig.attachment.get(CurrentUserKey);
    if (!user.role_id) throw new ForbiddenError('no permissions found');

    if (permissions.includes(user.role_id)) next();
    else throw new ForbiddenError('You are not allowed to consume this api');
  };

export default canAccess;
