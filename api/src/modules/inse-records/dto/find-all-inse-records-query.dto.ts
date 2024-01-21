import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllInseRecordsQueryDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  page?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  limit?: number;

  @IsString()
  @IsOptional()
  sorts?: string;

  @IsString()
  @IsOptional()
  classification?: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  capital_type?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  location_type?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  network_type?: number;

  @IsNumber()
  @IsOptional()
  state_id?: number;

  @IsNumber()
  @IsOptional()
  city_id?: number;
}
