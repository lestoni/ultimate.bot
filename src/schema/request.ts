import { JSONSchemaType } from 'ajv';
import { ApiRequestBody } from '../entities/request';

const schema: JSONSchemaType<ApiRequestBody> = {
  $id: 'RequestBody.json',
  type: 'object',
  properties: {
    bot_id: { type: 'string' },
    visitor_message: { type: 'string' }
  },
  required: ['bot_id', 'visitor_message'],
  additionalProperties: false
};

export default schema;
