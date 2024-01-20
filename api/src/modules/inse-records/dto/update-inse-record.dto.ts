import { PartialType } from '@nestjs/mapped-types';
import { CreateInseRecordDto } from './create-inse-record.dto';

export class UpdateInseRecordDto extends PartialType(CreateInseRecordDto) {}
