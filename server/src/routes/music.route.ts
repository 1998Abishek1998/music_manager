import { Router } from 'express';
import validateSchemaMiddleware from '../middlewares/validate.schema.middleware';
import { MusicCreateSchema, MusicUpdateSchema } from '../schemas/create-update.schema';
import {
  createMusic, deleteMusic, fetchMusicById, fetchMusicList, updateMusic,
  // streamMusicFromCloudinary,
  // uploadMusicToCloudinary
} from '../handlers/music.handler';
import canAccess from '../middlewares/can-access.middleware';
import { Role } from '../models/users.model';
// import upload from '../utils/multer';

const musicRoutes = Router()

musicRoutes.route('/')
  .get(fetchMusicList)
  .post(validateSchemaMiddleware(MusicCreateSchema), createMusic)

musicRoutes.route('/:id')
  .get(fetchMusicById)
  .put(validateSchemaMiddleware(MusicUpdateSchema), updateMusic)
  .delete(canAccess(Role.SUPER_ADMIN), deleteMusic)
// .post(upload, uploadMusicToCloudinary)

// musicRoutes.get('/stream-music/:publicId', streamMusicFromCloudinary)

export default musicRoutes
