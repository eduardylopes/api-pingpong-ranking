import { Document } from 'mongoose';

export interface Player extends Document {
  readonly email: string;
  readonly telephone: string;
  name: string;
  ranking: string;
  rankPosition: number;
  urlProfileImage: string;
}
