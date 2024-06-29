import { Request, Response, Router } from 'express';
import userRouter from './users.route';
import artistRoutes from './artists.route';
import musicRoutes from './music.route';

const apiRoutes = Router()

apiRoutes.get('/', (_req: Request, res: Response) => { res.status(200).json({ message: 'Success' }) })
apiRoutes.use('/users', userRouter)
apiRoutes.use('/artists', artistRoutes)
apiRoutes.use('/musics', musicRoutes)

export default apiRoutes
