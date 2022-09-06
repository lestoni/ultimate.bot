import { UltimateAIRequestBody } from './ultimate.ai';
import { ApiRequestBody } from './request';
import { ApiErrorResponseBody } from './response';

export class EntityMapper {
  static mapApiBodyToUltimateAiBody(
    apiBody: ApiRequestBody
  ): UltimateAIRequestBody {
    const { bot_id, visitor_message } = apiBody;

    return { botId: bot_id, message: visitor_message };
  }

  static mapErrorToApiResponseBody(
    err: Error,
    httpMethod: string,
    statusCode: number
  ): ApiErrorResponseBody {
    return {
      error: err.message,
      statusCode: statusCode,
      method: httpMethod
    };
  }
}
