import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

  @Put('/:_id')
  async updatePlayer(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Param('_id') _id: string,
  ) {
    await this.playersService.updatePlayer(_id, updatePlayerDto);
  }

  @Delete()
  async deletePlayer(@Query('email') email: string) {
    await this.playersService.deletePlayer(email);
  }

  @Get('/:_id')
  async getPlayer(@Param('_id') _id: string) {
    return await this.playersService.getPlayer(_id);
  }

  @Get()
  async getAllPlayers(): Promise<Player[]> {
    return await this.playersService.getAllPlayers();
  }
}
