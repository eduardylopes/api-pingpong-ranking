import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class Event {
  @IsString()
  name: string;

  @IsString()
  operation: string;

  @IsNumber()
  value: number;
}

export class CreateCategoryDto {
  @IsString()
  readonly category: string;

  @IsString()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Event)
  @ValidateNested({ each: true })
  events: Array<Event>;
}
