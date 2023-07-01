import { errorHandler } from './error-handler';

import type { NextApiRequest, NextApiResponse } from 'next';

export type OurHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void | NextApiResponse<any>>;
export type ApiWrapper = (handler: OurHandler) => OurHandler;

export class NextApiBuilder {
  handler: OurHandler;
  wrappers: ApiWrapper[];

  constructor(handler: OurHandler) {
    this.handler = handler;
    this.wrappers = [errorHandler];
  }

  add(wp: ApiWrapper) {
    if (!this.wrappers.includes(wp)) {
      this.wrappers.push(wp);
    }

    return this;
  }

  build(): OurHandler {
    let handler = this.handler;

    for (const c of this.wrappers.reverse()) {
      handler = c(handler);
    }

    return handler;
  }
}
