import { StatusCodes } from 'http-status-codes';
import { isResSent } from 'next/dist/shared/lib/utils';
import { ZodError } from 'zod';

import { ApiError, ERRORS } from '../error';

import { ApiWrapper, OurHandler } from './api-builder';

export const errorHandler: ApiWrapper = (handler: OurHandler) => async (req, res) => {
  try {
    await handler(req, res);

    if (!isResSent(res)) {
      throw new ApiError(ERRORS['METHOD_NOT_ALLOWED']);
    }
  } catch (err) {
    if (isResSent(res)) {
      // TODO: should we need to take care of broken handler
      //       after sending a response back to client? 🤔
      return;
    }

    if (err instanceof ZodError) {
      const zodError = new ApiError(ERRORS['VALIDATION_ERROR']);

      return res.status(zodError.statusCode).json(zodError);
    }

    if (err instanceof ApiError) {
      return res.status(err.statusCode).json(err);
    }

    const internalServerError = new ApiError(ERRORS['INTERNAL_SERVER_ERROR']);

    return res
      .status(res.statusCode >= 400 ? res.statusCode : StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError);
  }
};
