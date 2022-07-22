import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private playersService: PlayersService) {}

  @Post()
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    await this.playersService.createPlayer(createPlayerDto);
  }

  @Put()
  async updatePlayer(@Body() updatePlayerDto: UpdatePlayerDto) {
    await this.playersService.updatePlayer(updatePlayerDto);
  }

  @Delete()
  async deletePlayer(@Query('email') email: string) {
    await this.playersService.deletePlayer(email);
  }

  @Get('player')
  async listPlayer(@Query('email') email: string) {
    return await this.playersService.listPlayer(email);
  }

  @Get()
  async listAllPlayers(): Promise<Player[]> {
    return await this.playersService.listAllPlayers();
  }
}
