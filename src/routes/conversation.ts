import { Router, Request, Response } from 'express';

import createLogger from '../utils/logger';
import { ConversationController } from '../controllers';
import { ApiRequestBody, HttpMethods } from '../entities/request';
import { EntityMapper } from '../entities/mapper';
import { HttpStatusCodes } from '../entities/response';
import { MongoService } from '../services/mongo';
import { UltimateAIService } from '../services/ultimate.ai';
import validate from '../utils/validator';

// Dependecy Injection
const conversationController = new ConversationController(
  new MongoService(),
  new UltimateAIService()
);
const conversationRouter = Router();
const logger = createLogger('routes:conversation');

interface EnrichedErrorObject {
  statusCode: number;
}

// POST /reply?intent_threshold=<0.0-0.9>
conversationRouter.post('/', async (req: Request, res: Response) => {
  try {
    const reqBody = <ApiRequestBody>req.body;

    validate('RequestBody.json', reqBody);

    // The should be in the db as per of configuration data
    const DEFAULT_INTENT_THRESHOLD = '0.9'; // We are that confident in the ai
    // Get a threshold

    // Retrieve intent threshold from query otherwise use the default
    // Definetly could data validation
    const intentThreshold = parseFloat(
      <string>req.query.replyConfidence || DEFAULT_INTENT_THRESHOLD
    );

    const reply = await conversationController.getReply(
      reqBody,
      intentThreshold
    );

    res.json(reply);
  } catch (err) {
    // Can do better classify errors to approriately communicate what the issue is
    logger.error('Conversation Router experienced an error', err);
    const error = EntityMapper.mapErrorToApiResponseBody(
      err,
      HttpMethods.POST,
      err.statusCode || HttpStatusCodes.http_5xx
    );

    res.statusCode = error.statusCode;
    res.json(error);
  }
});

export default conversationRouter;
