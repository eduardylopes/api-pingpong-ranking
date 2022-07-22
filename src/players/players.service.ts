import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(@InjectModel('Player') private playerModel: Model<Player>) {}

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { email } = createPlayerDto;

    const playerAlreadyExists = await this.findByEmail(email);

    if (playerAlreadyExists) {
      throw new HttpException('Player already exists', HttpStatus.BAD_REQUEST);
    }

    const player = await this.create(createPlayerDto);

    return player;
  }

  async updatePlayer(updatePlayerDto: UpdatePlayerDto): Promise<void> {
    const { email } = updatePlayerDto;

    const playerAlreadyExists = await this.findByEmail(email);

    if (!playerAlreadyExists) {
      throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
    }

    this.update(updatePlayerDto);
  }

  async listAllPlayers(): Promise<Player[]> {
    return await this.findAll();
  }

  async listPlayer(email: string): Promise<Player> {
    const player = await this.findByEmail(email);

    if (!player) {
      throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
    }

    return player;
  }

  async deletePlayer(email: string): Promise<void> {
    const player = await this.findByEmail(email);

    if (!player) {
      throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
    }

    await this.delete(email);
  }

  private async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const playerCreated = new this.playerModel(createPlayerDto);

    return await playerCreated.save();
  }

  private async update(updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    const { email } = updatePlayerDto;

    return await this.playerModel
      .findOneAndUpdate({ email }, { $set: updatePlayerDto })
      .exec();
  }

  private async findByEmail(email: string): Promise<Player> {
    const player = await this.playerModel.findOne({ email }).exec();

    return player;
  }

  private async findAll(): Promise<Player[]> {
    return this.playerModel.find().exec();
  }

  private async delete(email: string): Promise<void> {
    await this.playerModel.remove({ email });
  }
}
