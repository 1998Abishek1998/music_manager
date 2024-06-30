import { Router } from 'express';
import validateSchemaMiddleware from '../middlewares/validate.schema.middleware';
import { ArtistUpdateSchema } from '../schemas/create-update.schema';
import { deleteArtist, fetchArtist, fetchArtistList, getArtistCsvData, updateArtist, uploadCsv } from '../handlers/artists.handler';
import canAccess from '../middlewares/can-access.middleware';
import { Role } from '../models/users.model';
import multer from 'multer'

const storage = multer.diskStorage({
  filename: function (_req: any, file: { originalname: any; }, cb: (arg0: null, arg1: any) => void) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

const artistRoutes = Router()

artistRoutes.get('/', canAccess(Role.SUPER_ADMIN, Role.ARTIST_MANAGER), fetchArtistList)
artistRoutes.post('/import-csv', upload.single("file"), uploadCsv)
artistRoutes.get('/export-csv', canAccess(Role.ARTIST_MANAGER), getArtistCsvData)

artistRoutes.route('/:id')
  .get(fetchArtist)
  .put(validateSchemaMiddleware(ArtistUpdateSchema), updateArtist)
  .delete(canAccess(Role.SUPER_ADMIN), deleteArtist)

export default artistRoutes
