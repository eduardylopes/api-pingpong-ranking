import { IsString } from 'class-validator';

export class AssignCategoryToPlayerDto {
  @IsString()
  category: any;

  @IsString()
  playerId: any;
}
