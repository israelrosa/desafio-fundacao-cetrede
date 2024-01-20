import { Injectable } from '@nestjs/common';
import { CreateInseRecordDto } from './dto/create-inse-record.dto';
import { UpdateInseRecordDto } from './dto/update-inse-record.dto';

@Injectable()
export class InseRecordsService {
  create(createInseRecordDto: CreateInseRecordDto) {
    return 'This action adds a new inseRecord';
  }

  findAll() {
    return `This action returns all inseRecords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inseRecord`;
  }

  update(id: number, updateInseRecordDto: UpdateInseRecordDto) {
    return `This action updates a #${id} inseRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} inseRecord`;
  }
}
