import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { PlayersService } from 'src/players/players.service';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { ChallengeStatus } from './interfaces/challenge-status.enum';
import { Challenge } from './interfaces/challenge.interface';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
    private readonly playersService: PlayersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async createChallenge(
    createChallengeDto: CreateChallengeDto,
  ): Promise<Challenge> {
    const { players, challenger, challengeDateTime } = createChallengeDto;
    const [player1, player2] = players;

    const player1Found = await this.playersService.getPlayer(player1._id);
    const player2Found = await this.playersService.getPlayer(player2._id);

    if (!player1Found) {
      throw new HttpException('Player 1 not found', HttpStatus.NOT_FOUND);
    }

    if (!player2Found) {
      throw new HttpException('Player 2 not found', HttpStatus.NOT_FOUND);
    }

    const challengerIsIncludedInPlayers = players.includes(challenger._id);

    if (challengerIsIncludedInPlayers) {
      throw new HttpException(
        'The challenger must be one of the players',
        HttpStatus.CONFLICT,
      );
    }

    const challengerHasCategory =
      await this.categoriesService.getPlayerCategory(challenger._id);

    if (!challengerHasCategory) {
      throw new HttpException(
        'The challenger must be included in a category',
        HttpStatus.BAD_REQUEST,
      );
    }

    const challenge = new this.challengeModel();

    Object.assign(challenge, {
      challenger,
      players,
      category: challengerHasCategory.category,
      status: ChallengeStatus.PENDING,
      challengeDateTime,
      challengeDateRequest: new Date(),
    });

    return await this.create(challenge);
  }

  async getAllChallenges(): Promise<Challenge[]> {
    return this.findAll();
  }

  async getChallengeById(_id: string): Promise<Challenge> {
    const challengeFound = await this.findById(_id);

    if (!challengeFound) {
      throw new HttpException('Challenge not found', HttpStatus.NOT_FOUND);
    }

    return challengeFound;
  }

  private async create(challenge: Challenge): Promise<Challenge> {
    return challenge.save();
  }

  private async findAll(): Promise<Challenge[]> {
    return await this.challengeModel.find().populate('players');
  }

  private async findById(_id: any): Promise<Challenge> {
    return await (
      await this.challengeModel.findOne({ _id })
    ).populate('players');
  }
}
