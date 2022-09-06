import mongoose from 'mongoose';
import { IntentDocument } from '../../entities/intent';
import config from '../../utils/config';
import createLogger from '../../utils/logger';
import * as migrations from './migrations/add_collections';
import { Intent } from './models/intent';

const logger = createLogger('services:mongo:index');

export class MongoService {
  // For fast searches we can index replies/intents

  async getReplyByIntentName(name: string): Promise<IntentDocument | null> {
    const intentDoc = await Intent.findOne({ name }).populate('reply');
    return intentDoc;
  }

  static async establishConnection() {
    // connect to MongoDB
    await mongoose.connect(config.get('MONGODB_URL'));

    // Add MongoDB connection error Handler
    mongoose.connection.on('error', () => {
      logger.error('responding to MongoDB connection error');
      logger.warning(
        'MongoDB connection error. Please make sure MongoDB is running'
      );
      process.exit(1);
    });

    // Add Handler for MongoDB Disconnection Handler
    mongoose.connection.on('disconnected', () => {
      // Reconnect to MongoDB
      mongoose.connect(config.get('MONGODB_URL'));
    });
  }

  static async runMigrations() {
    try {
      await migrations.up();
    } catch (err) {
      logger.error('Data Migration to Mongodb Failed', err);
      await migrations.down();
      process.exit(1);
    }
  }
}
