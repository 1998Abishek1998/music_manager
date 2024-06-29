import { Router } from 'express';
import validateSchemaMiddleware from '../middlewares/validate.schema.middleware';
import { UserCreateSchema } from '../schemas/create-update.schema';
import { createUser, deleteUser, fetchUser, fetchUsers, updateUser } from '../handlers/users.handler';
import canAccess from '../middlewares/can-access.middleware';
import { Role } from '../models/users.model';

const userRouter = Router()

userRouter.route('/')
  .post(canAccess(Role.SUPER_ADMIN), validateSchemaMiddleware(UserCreateSchema), createUser)
  .get(canAccess(Role.ARTIST_MANAGER, Role.SUPER_ADMIN), fetchUsers)

userRouter.route('/:id')
  .get(fetchUser)
  .put(canAccess(Role.SUPER_ADMIN, Role.ARTIST_MANAGER), updateUser)
  .delete(canAccess(Role.SUPER_ADMIN), deleteUser)

export default userRouter
