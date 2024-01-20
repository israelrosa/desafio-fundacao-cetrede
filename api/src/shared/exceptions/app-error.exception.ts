import { HttpException } from '@nestjs/common';
import { logger } from '../utils/logger';

interface ErrorFormat {
  status: number;
  message: string;
  id: string;
  error?: any;
}

export class AppError extends HttpException {
  constructor({ status, message, id, error }: ErrorFormat) {
    logger.error(`${id}: ${message}`, error);
    super({ id, message }, status);
  }
}
