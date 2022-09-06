import { model, Schema, Types } from 'mongoose';
import { IntentDocument } from '../../../entities/intent';

const IntentSchema: Schema = new Schema({
  name: { type: String },
  description: { type: String },
  reply: { type: Types.ObjectId, ref: 'Reply' }
});

export const Intent = model<IntentDocument>('Intent', IntentSchema);
