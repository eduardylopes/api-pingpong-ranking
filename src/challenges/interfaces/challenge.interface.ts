import { Document } from 'mongoose';
import { Player } from 'src/players/interfaces/player.interface';
import { ChallengeStatus } from './challenge-status.enum';

export interface Challenge extends Document {
  challengeDataTime: Date;
  challengeDateRequest: Date;
  challengeDateResponse: Date;
  status: ChallengeStatus;
  challenger: Player;
  category: string;
  players: Array<Player>;
  match: Match;
}

export interface Match extends Document {
  category: string;
  players: Array<Player>;
  challenged: Player;
  result: Array<Result>;
}

export interface Result {
  set: string;
}
