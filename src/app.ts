import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { thingsRouter } from './routers/things.router.js';
import createDebug from 'debug';
import { CustomError } from './errors/errors.js';
import { usersRouter } from './routers/users.router.js';

const debug = createDebug('W6:app');
export const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: '*',
};
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

app.use('/thingschallenge', thingsRouter);
app.use('/users', usersRouter);

app.get('/', (_req, resp) => {
  resp.json({
    info: 'Things project app',
    endpoints: {
      things: '/thingschallenge',
      users: '/users',
    },
  });
});

app.use(express.static('public/images/favicon.ico'));

app.use(
  (error: CustomError, _req: Request, resp: Response, _next: NextFunction) => {
    debug('Soy el middleware de errores');
    const status = error.statusCode || 500;
    const statusMessage = error.statusMessage || 'Internal server error';
    resp.status(status);
    resp.json({
      error: [
        {
          status,
          statusMessage,
        },
      ],
    });
    debug(status, statusMessage, error.message);
  }
);
