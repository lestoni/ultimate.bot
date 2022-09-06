import axios from 'axios';
import {
  UltimateAIIntent,
  UltimateAIRequestBody,
  UltimateAIResponseBody
} from '../entities/ultimate.ai';
import config from '../utils/config';
import createLogger from '../utils/logger';

const logger = createLogger('services:ultimate.ai');

export class UltimateAIService {
  async getIntents(
    reqData: UltimateAIRequestBody
  ): Promise<UltimateAIIntent[]> {
    logger.info(
      'UltimateAIService:getIntents -  retrieve intents for a given visitor message'
    );

    try {
      const axiosConfig = {
        headers: {
          Authorization: config.get('ULTIMATE_AI_API_KEY')
        }
      };
      const uri = `${config.get('ULTIMATE_AI_API_URL')}/intents`;
      console.log(uri);

      const res = await axios.post<UltimateAIResponseBody>(
        uri,
        reqData,
        axiosConfig
      );

      const {
        data: { intents }
      } = res;
      return intents;
    } catch (err) {
      // Could use retry logic(circuit breaker) if Ultimate API is down
      logger.error('Call to Ultimate AI Api Failed', err);
      throw err;
    }
  }
}
