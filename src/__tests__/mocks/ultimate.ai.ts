/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from '@faker-js/faker';
import {
  UltimateAIIntent,
  UltimateAIRequestBody
} from '../../entities/ultimate.ai';

export class UltimateAIServiceMock {
  async getIntents(
    reqData: UltimateAIRequestBody
  ): Promise<UltimateAIIntent[]> {
    return [
      {
        confidence: faker.datatype.float(),
        name: faker.datatype.string()
      }
    ];
  }
}
