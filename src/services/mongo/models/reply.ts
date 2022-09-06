import { model, Schema } from 'mongoose';
import { ReplyDocument } from '../../../entities/reply';

const ReplySchema = new Schema({
  text: { type: String }
});

export const Reply = model<ReplyDocument>('Reply', ReplySchema);
