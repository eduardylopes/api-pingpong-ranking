import { IsString } from 'class-validator';

export class UpdatePlayerDto {
  @IsString()
  readonly telephone: string;

  @IsString()
  readonly name: string;
}
