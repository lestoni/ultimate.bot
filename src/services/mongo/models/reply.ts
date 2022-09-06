import { model, Schema } from 'mongoose';
import { ReplyDocument } from '../../../entities/reply';

const ReplySchema = new Schema(
  {
    text: { type: String }
  },
  { bufferCommands: false }
);

export const Reply = model<ReplyDocument>('Reply', ReplySchema);
