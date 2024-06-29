import 'express-async-errors';

import server from './src/server';
import express from 'express'
import path from 'path';
import envConfig from './src/configs/env.config';
import { logRoutes } from './src/configs/routes.config';

server()
  .then((app) => {

    const { port, env } = envConfig

    process.on('uncaughtException', err => {
      console.log('UNCAUGHT EXCEPTION! 💥');
      console.log(JSON.stringify(err));
      process.exit(1);
    });

    app.use(express.static(path.join(__dirname, '../dist/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../dist/build/index.html'));
    });

    app.use((_req, res) => {
      res.status(404);
      res.json({
        failed: true,
        message: 'url not found',
      });
    });

    const server = app.listen(port, () => console.log(`app server started on: ${port} (${env})`));

    logRoutes(app)
    process.on('unhandledRejection', (err: Error) => {
      console.log('UNHANDLED REJECTION! 💥');
      console.log(JSON.stringify(err));
      server.close(() => {
        process.exit(1);
      });
    });

    process.on('SIGTERM', () => {
      console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
      server.close(() => console.log('💥 Process terminated!'));
    });
  })
  .catch(console.error)
