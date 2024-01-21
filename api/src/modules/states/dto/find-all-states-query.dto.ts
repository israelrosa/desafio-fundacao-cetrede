import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllStatesQueryDto {
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

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  city_id?: number;

  @IsString()
  @IsOptional()
  region?: string;
}
