import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    telephone: { type: String, unique: true },
    ranking: String,
    rankPosition: Number,
    urlProfileImage: String,
  },
  { timestamps: true, collection: 'players' },
);
