/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { config } from 'winston';
import { IntentDocument } from '../../entities/intent';
import logger from '../../utils/logger';
import { faker } from '@faker-js/faker';
import { ReplyDocument } from '../../entities/reply';
import { Document } from 'mongoose';

export class MongoServiceMock {
  async getReplyByIntentName(_name: string): Promise<IntentDocument> {
    const doc = {
      name: faker.datatype.string(),
      reply: <ReplyDocument>{
        text: faker.datatype.string()
      }
    };

    return doc as Document & IntentDocument;
  }

  static async establishConnection() {}

  static async runMigrations() {}
}
