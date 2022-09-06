import { model, Schema, Types } from 'mongoose';
import { IntentDocument } from '../../../entities/intent';

const IntentSchema: Schema = new Schema({
  name: { type: String },
  description: { type: String },
  reply: { type: Types.ObjectId, ref: 'Reply' }
},{ bufferCommands: false });

export const Intent = model<IntentDocument>('Intent', IntentSchema);
