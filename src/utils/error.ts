import { StatusCodes } from 'http-status-codes';

interface IError<TDetail = any> {
  name: string;
  statusCode: StatusCodes;
  code: string;
  message: string;
  detail?: TDetail;
}

export class ApiError<TDetail = any> extends Error implements IError<TDetail> {
  name: string;
  statusCode: StatusCodes;
  code: string;
  message: string;
  detail?: TDetail;

  constructor(e: IError) {
    super(e.message);
    this.name = e.name;
    this.statusCode = e.statusCode;
    this.code = e.code;
    this.message = e.message;
    this.detail = e.detail;
  }

  toJSON() {
    return {
      name: this.name,
      statusCode: this.statusCode,
      code: this.code,
      message: this.message,
      detail: this.detail,
    };
  }
}

export class ErrorFactory {
  static create(type: ErrorFactoryType, message?: string): ApiError {
    const e: IError = ERRORS[type];

    if (message) {
      e.message = message;
    }

    return new ApiError(e);
  }
}

export type ErrorFactoryCreateOpt = {
  name: string;
  statusCode: number;
  code: string;
  message: string;
};

export type ErrorFactoryType = keyof typeof ERRORS;
export const ERRORS = {
  // BSE: Basic Errors
  INTERNAL_SERVER_ERROR: {
    name: 'InternalServerError',
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    code: 'BSE000',
    message: 'Internal Server Error',
  },
  BAD_REQUEST: {
    name: 'BadRequest',
    statusCode: StatusCodes.BAD_REQUEST,
    code: 'BSE001',
    message: 'Bad Request',
  },
  VALIDATION_ERROR: {
    name: 'ValidationError',
    statusCode: StatusCodes.BAD_REQUEST,
    code: 'BSE002',
    message: 'Invalid data in query string or request body. Please check your request',
  },
  METHOD_NOT_ALLOWED: {
    name: 'MethodNotAllowed',
    statusCode: StatusCodes.METHOD_NOT_ALLOWED,
    code: 'BSE003',
    message: 'Method not allowed',
  },

  // NFE: Not Found Errors
  NOT_FOUND: {
    name: 'NotFound',
    statusCode: StatusCodes.NOT_FOUND,
    code: 'NFE000',
    message: 'Object not found',
  },

  // AUE: Authorization and Authentication Error
  UNAUTHORIZED_REQUEST: {
    name: 'UnauthorizedRequest',
    statusCode: StatusCodes.UNAUTHORIZED,
    code: 'AUE000',
    message: 'Your request is not authorized',
  },
  FORBIDDEN: {
    name: 'Forbidden',
    statusCode: StatusCodes.FORBIDDEN,
    code: 'AUE001',
    message: 'You are not authorized to do this action',
  },
  TOO_MANY_REQUESTS: {
    name: 'TooManyRequests',
    statusCode: StatusCodes.TOO_MANY_REQUESTS,
    code: 'AUE002',
    message: 'You have sent too many requests in a given amount of time',
  },
  INVALID_TOKEN: {
    name: 'InvalidToken',
    statusCode: StatusCodes.UNAUTHORIZED,
    code: 'AUE100',
    message: 'Your token is not valid',
  },
  TOKEN_EXPIRED: {
    name: 'TokenExpired',
    statusCode: StatusCodes.UNAUTHORIZED,
    code: 'AUE101',
    message: 'Your token has been expired',
  },
} as const;
