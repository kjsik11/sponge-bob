import { z } from 'zod';

import { makeParser } from './parser';

export type StatusCheckReq = {
  status: boolean;
};

export const validateStatusCheck = makeParser<StatusCheckReq>(
  z.object({
    status: z.boolean(),
  }),
);
