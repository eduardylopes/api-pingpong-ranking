import { IsEmail, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  readonly telephone: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly name: string;
}
