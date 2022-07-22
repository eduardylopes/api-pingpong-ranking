import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    telephone: { type: String },
    ranking: { type: String },
    rankPosition: { type: Number },
    urlProfileImage: { type: String },
  },
  { timestamps: true, collection: 'players' },
);
