import { Document } from 'mongoose';

export interface ReplyDocument extends Document {
  text: string;
}
