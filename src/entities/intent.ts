import { ReplyDocument } from './reply';
import { Document } from 'mongoose';

export interface IntentDocument extends Document {
  name: string;
  reply: ReplyDocument;
}
