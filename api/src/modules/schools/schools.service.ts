import { Injectable } from '@nestjs/common';

@Injectable()
export class SchoolsService {
  findAll() {
    return `This action returns all schools`;
  }
}
