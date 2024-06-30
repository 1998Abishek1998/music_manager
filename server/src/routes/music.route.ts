import { Router } from 'express';
import validateSchemaMiddleware from '../middlewares/validate.schema.middleware';
import { MusicCreateSchema, MusicUpdateSchema } from '../schemas/create-update.schema';
import {
  createMusic, deleteMusic, fetchMusicById, fetchMusicList, updateMusic,
  uploadToserver,
  streamServerMusic,
} from '../handlers/music.handler';
import canAccess from '../middlewares/can-access.middleware';
import { Role } from '../models/users.model';
import multer from 'multer'

const storage = multer.diskStorage({
  filename: function (_req: any, file: { originalname: any; }, cb: (arg0: null, arg1: any) => void) {
    cb(null, file.originalname)
  },
  destination: function (_req: any, _file: any, cb: (arg0: null, arg1: string) => void) {
    cb(null, './uploads')
  },
})

const upload = multer({ storage })
const musicRoutes = Router()

musicRoutes.route('/')
  .get(fetchMusicList)
  .post(validateSchemaMiddleware(MusicCreateSchema), createMusic)

musicRoutes.route('/:id')
  .get(fetchMusicById)
  .put(validateSchemaMiddleware(MusicUpdateSchema), updateMusic)
  .delete(canAccess(Role.SUPER_ADMIN), deleteMusic)
  .post(upload.single("file"), uploadToserver)

musicRoutes.get('/stream-music/:id/:publicId', streamServerMusic)

export default musicRoutes
