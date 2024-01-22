import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllSchoolQueryDto {
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

  @IsString()
  @IsOptional()
  region?: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  state_id?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  city_id?: number;
}
