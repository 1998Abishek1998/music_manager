import { JwtPayload, sign, verify } from 'jsonwebtoken';
import envConfig from '../configs/env.config';
import { Role } from '../models/users.model';

export type UserPayload = {
  userId: number;
};

export type JWTConfig = {
  secretKey: string;
  expiresIn: string;
};

const getJWTConfig = (authUser: Role): JWTConfig => {
  switch (authUser) {
    case Role.ARTIST:
      return {
        secretKey: envConfig.ARTIST_JWT_SECRET,
        expiresIn: envConfig.JWT_EXPIRES_IN,
      };
    case Role.ARTIST_MANAGER:
      return {
        secretKey: envConfig.ARTIST_MANAGER_JWT_SECRET,
        expiresIn: envConfig.JWT_EXPIRES_IN,
      };
    case Role.SUPER_ADMIN:
      return {
        secretKey: envConfig.ADMIN_JWT_SECRET,
        expiresIn: envConfig.JWT_EXPIRES_IN,
      };
  }
};


export const generateToken = (payload: UserPayload, authUser: Role): string => {
  const config = getJWTConfig(authUser);
  return sign(payload, config.secretKey, {
    expiresIn: config.expiresIn,
  });
};

export const verifyToken = (token: string, authUser: Role): UserPayload & JwtPayload | null => {
  try {
    const config = getJWTConfig(authUser);
    return verify(token, config.secretKey) as UserPayload;
  } catch (err) {
    return null;
  }
};
