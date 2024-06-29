import { Router } from 'express';
import validateSchemaMiddleware from '../middlewares/validate.schema.middleware';
import { LoginSchema } from '../schemas/login.schema';
import { LoginUser, RegisterUser } from '../handlers/auth.handler';
import { UserCreateSchema } from '../schemas/create-update.schema';

const authRoutes = Router()

authRoutes.post('/login',
  validateSchemaMiddleware(LoginSchema),
  LoginUser)
authRoutes.post('/register',
  validateSchemaMiddleware(UserCreateSchema),
  RegisterUser)

export default authRoutes
