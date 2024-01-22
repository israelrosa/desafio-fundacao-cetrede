import { HttpStatus } from '@nestjs/common';
import { AppError } from '@/shared/exceptions/app-error.exception';

export class SchoolNotFoundException extends AppError {
  constructor() {
    super({
      id: 'SCHOOL_NOT_FOUND',
      message: 'School not found.',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
