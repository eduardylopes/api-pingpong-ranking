import { IsEmail, IsString } from 'class-validator';

export class UpdatePlayerDto {
  @IsString()
  readonly telephone: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly name: string;
}
