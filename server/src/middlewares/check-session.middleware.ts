import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../utils/error';
import { verifyToken } from '../utils/jwt';
import instanceConfig from '../configs/instance.config';
import { AttachmentKey } from '../utils/attachments';
import { SimpleUser, Status } from '../models/users.model';

const fetchToken = (req: Request): string | undefined => {
  const authorizationHeader = req.headers?.authorization;
  if (authorizationHeader) {
    const token = authorizationHeader?.split(' ').at(-1);

    if (!token) {
      throw new UnauthorizedError('No token provided');
    }
    return token;
  }

  return undefined;
};

const fetchAuthUser = (req: Request): number | undefined => {
  const authUserHeader = req.headers?.['x-user'] as string;
  if (authUserHeader) {
    const authUser = authUserHeader?.split(' ').at(-1);
    if (!authUser) {
      throw new UnauthorizedError('No user role provided');
    }
    return Number(authUser);
  }

  return undefined;
};

export const CurrentUserKey = AttachmentKey.from<SimpleUser>('current-user');

export default async (req: Request, res: Response, next: NextFunction) => {
  console.log('Fetching Token and user authorization.');
  const token = fetchToken(req);
  const authUser = fetchAuthUser(req);

  if (token && authUser) {
    const decoded = verifyToken(token, authUser);
    if (decoded) {
      const { users, attachment } = instanceConfig;

      const { data: user } = await users.fetchUsers({ id: Number(decoded.userId || decoded.aud), status: Status.ACTIVE, limit: 1 });

      if (user.length) {
        attachment.put(CurrentUserKey, user[0]);
        next();
        return;
      }
    }
  }

  throw new UnauthorizedError();
};
