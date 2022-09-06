import { Request, Response, Express } from 'express';

import creatLogger from '../utils/logger';
import config from '../utils/config';
import { pkg, ip } from '../utils/meta';
import conversationRouter from './conversation';

const logger = creatLogger('routes:index');

function bindRoutes(app: Express) {
  app.use('/reply', conversationRouter);

  app.use('/', (req: Request, res: Response): void => {
    logger.info('View api info');

    const port = config.get('PORT');
    const { version, name, description } = pkg;

    res.json({
      message: 'Welcome to Ultimate ai api!',
      documentation: `http://localhost:${port}/docs or http://${ip}:${port}/docs`,
      version,
      description,
      name
    });
  });
}

export default bindRoutes;
