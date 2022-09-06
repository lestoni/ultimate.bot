import Ajv from 'ajv';
import { ApiRequestBody } from '../entities/request';

import RequestSchema from '../schema/request';

const ajv = new Ajv({
  schemas: [RequestSchema]
});

function validate(schemaName: string, data: ApiRequestBody): void | never {
  const validator = ajv.getSchema(schemaName);
  if (!validator) {
    throw new Error('data validation failed: missing schema');
  }

  const valid = validator(data);
  if (!valid) {
    // error message can be structured nicely for good api experience
    throw {
      message: `data validation failed: ${JSON.stringify(validator.errors)}`,
      statusCode: 400
    };
  }
}

export default validate;
