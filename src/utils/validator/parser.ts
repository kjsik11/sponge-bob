import { ApiError, ERRORS } from '../error';

import type { z, ZodError } from 'zod';

export function makeParser<IN extends object, OUT = IN>(
  zod: z.ZodObject<any>,
  error?: ApiError,
): (target: object) => Promise<OUT> {
  return async (target: object) => {
    return (await zod.parseAsync(target).catch((zodError: ZodError) => {
      const e = new ApiError(ERRORS['VALIDATION_ERROR']);
      e.message = zodError.issues.length ? zodError.issues[0].message : e.message;
      e.detail = zodError.issues;

      throw error || e;
    })) as any as OUT;
  };
}
