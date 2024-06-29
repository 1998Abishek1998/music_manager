import express, { NextFunction, Request } from 'express'
import routes from './routes';
import cors from 'cors'
import handleError from './middlewares/handle.error.middleware';
import { newDate, newDateOnly } from './utils/date';

async function server() {

  const app = express();
  const corsOptions = {
    origin: [
      'https://www.nileshblog.tech',
      'http://localhost:5173',
      'http://localhost:3000'
    ],
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api', routes);

  console.log(newDateOnly())
  app.use(handleError)

  // handling 404 response


  return app
}

export default server
