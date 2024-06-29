import { Router } from 'express';
import checkSessionMiddleware from '../middlewares/check-session.middleware';
import apiRoutes from './api.route';
import authRoutes from './auth.route';

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/v1', checkSessionMiddleware, apiRoutes)

export default routes
