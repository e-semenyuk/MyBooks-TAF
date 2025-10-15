import Ajv from 'ajv';
import schema from '../schemas/user.get.v1.schema.json';
const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);
export function validateUserGetV1(data: unknown) {
  if (!validate(data)) throw new Error(`user.get.v1 schema error: ${ajv.errorsText(validate.errors)}`);
}


