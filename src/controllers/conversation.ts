import createLogger from '../utils/logger';
import { MongoService } from '../services/mongo';
import { UltimateAIService } from '../services/ultimate.ai';
import { ApiRequestBody } from '../entities/request';
import { EntityMapper } from '../entities/mapper';
import { ApiResponseBody } from '../entities/response';

const logger = createLogger('controllers:conversation');
const DEFAULT_MESSAGE_REPLY_MESSAGE =
  'Sorry! I am not able to answer that at the moment :) One of our team members will help you!';

export class ConversationController {
  constructor(
    private readonly mongoService: MongoService,
    private readonly ultimateAIService: UltimateAIService
  ) {}

  async getReply(
    data: ApiRequestBody,
    intentThreshold = 0.9
  ): Promise<ApiResponseBody> {
    logger.info(
      'ConversationController:getReply: retrieves a reply for a given visitor message'
    );

    const ultimateAIReqBody = EntityMapper.mapApiBodyToUltimateAiBody(data);

    // 1. Retrieve Intents from ultimate ai api - external calls before refining data
    const intents = await this.ultimateAIService.getIntents(ultimateAIReqBody);
    // 2. Find the intent whose confidence is greater than the provided one
    const matchingIntent = intents.find((intent) => {
      return intent.confidence > intentThreshold;
    });
    if (!matchingIntent) {
      return { text: DEFAULT_MESSAGE_REPLY_MESSAGE };
    }

    // 3. Retrieve reply from db
    const conversationReply = await this.mongoService.getReplyByIntentName(
      matchingIntent.name
    );
    if (!conversationReply) {
      return { text: DEFAULT_MESSAGE_REPLY_MESSAGE };
    }

    return { text: conversationReply.reply.text };
  }
}
