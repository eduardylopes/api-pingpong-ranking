import * as mongoose from 'mongoose';

export const ChallengeSchema = new mongoose.Schema(
  {
    challengeDateTime: { type: Date },
    challengeDateRequest: { type: Date },
    challengeDateResponse: { type: Date },
    status: { type: String },
    challenger: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    category: { type: String },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
  },
  { timestamps: true, collection: 'challenges' },
);
