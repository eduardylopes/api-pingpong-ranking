import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsObject,
} from 'class-validator';
import { Player } from 'src/players/interfaces/player.interface';

export class CreateChallengeDto {
  @IsDateString()
  challengeDateTime: Date;

  @IsObject()
  challenger: Player;

  @IsArray()
  @ArrayMaxSize(2)
  @ArrayMinSize(2)
  players: Array<Player>;
}
