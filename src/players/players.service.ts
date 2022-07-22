import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;

    const playerAlreadyExists = await this.findByEmail(email);

    if (playerAlreadyExists) {
      throw new HttpException('Player already exists', HttpStatus.BAD_REQUEST);
    }

    await this.create(createPlayerDto);
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

  private async create({
    name,
    email,
    telephone,
  }: CreatePlayerDto): Promise<void> {
    const player: Player = {
      _id: uuidv4(),
      email,
      telephone,
      name,
      ranking: 'A',
      rankPosition: 1,
      urlProfileImage: 'https://github.com/eduardylopes.jpg',
    };

    await this.players.push(player);
  }

  private async update({
    name,
    email,
    telephone,
  }: UpdatePlayerDto): Promise<void> {
    const player = await this.players.find((player) => player.email === email);

    Object.assign(player, { name, email, telephone });
  }

  private async findByEmail(email: string): Promise<Player> {
    const player = this.players.find((player) => player.email === email);

    return player;
  }

  private async findAll(): Promise<Player[]> {
    return this.players;
  }

  private async delete(email: string): Promise<void> {
    const playerIndex = await this.players.findIndex(
      (player) => player.email === email,
    );

    await this.players.splice(playerIndex, 1);
  }
}
