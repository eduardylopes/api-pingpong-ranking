import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { email } = createPlayerDto;

    const playerAlreadyExists = await this.findByEmail(email);

    if (playerAlreadyExists) {
      throw new HttpException('Player already exists', HttpStatus.CONFLICT);
    }

    const player = await this.create(createPlayerDto);
    return player;
  }

  async updatePlayer(
    _id: string,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<void> {
    const player = await this.findById(_id);

    if (!player) {
      throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
    }

    this.update(_id, updatePlayerDto);
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.findAll();
  }

  async getPlayer(_id: string): Promise<Player> {
    const player = await this.findById(_id);
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
    const playerAlreadyExists = await this.findByEmail(createPlayerDto.email);

    if (playerAlreadyExists) {
      throw new HttpException('Player already exists', HttpStatus.CONFLICT);
    }

    const playerCreated = new this.playerModel(createPlayerDto);

    return await playerCreated.save();
  }

  private async update(
    _id: string,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<Player> {
    return await this.playerModel.findOneAndUpdate(
      { _id },
      { $set: updatePlayerDto },
    );
  }

  private async findById(_id: string): Promise<Player> {
    const player = await this.playerModel.findOne({ _id });

    return player;
  }

  private async findByEmail(email: string): Promise<Player> {
    const player = await this.playerModel.findOne({ email });

    return player;
  }

  private async findAll(): Promise<Player[]> {
    return this.playerModel.find();
  }

  private async delete(email: string): Promise<void> {
    await this.playerModel.deleteOne({ email });
  }
}
