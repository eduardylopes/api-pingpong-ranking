import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  private readonly logger = new Logger(PlayersService.name);

  async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    this.logger.log(`criaJogadorDto: ${createPlayerDto}`);
    await this.criar(createPlayerDto);
  }

  private async criar({
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

    this.players.push(player);
  }
}
