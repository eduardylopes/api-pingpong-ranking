import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class Event {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  operation: string;

  @IsOptional()
  @IsNumber()
  value: number;
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  readonly category: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Event)
  @ValidateNested({ each: true })
  events: Array<Event>;
}
