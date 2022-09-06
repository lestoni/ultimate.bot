import express, { Request, Response } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import createLogger from './utils/logger';
import config from './utils/config';
import { ip } from './utils/meta';
import bindRoutes from './routes';
import { MongoService } from './services/mongo';

const app = express();
const port = config.get('PORT');
const logger = createLogger('app');

app.use(morgan('tiny'));
app.use(bodyParser.json());

// API Routes Handler
bindRoutes(app);

// Default handler for unknown routes
app.use('*', (req: Request, res: Response) => {
  res.statusCode = 404;
  res.json({
    error: {
      message: 'End of the road Buster!!'
    }
  });
});

if (require.main === module) {
  // connect to MongoDB
  MongoService.establishConnection().then(async () => {
    // Do Migration to Mongodb
    await MongoService.runMigrations();

    app.listen(port, () => {
      logger.info(
        `Ultimate.bot: API running on - http://localhost:${port} or http://${ip}:${port}`
      );
      logger.info(
        `Ultimate.bot: Documentation available on - http://localhost:${port}/docs or http://${ip}:${port}/docs`
      );
    });
  });
}

// Handle unexpected process errors
process.on('uncaughtException', (err: Error) => {
  logger.error(`API experienced an unexpected error: ${err.message}`, err);
  process.exit(1);
});

export default app;
