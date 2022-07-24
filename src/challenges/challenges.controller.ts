import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dtos/create-challenge.dto';

@Controller('api/v1/challenges')
export class ChallengesController {
  constructor(private challengeService: ChallengesService) {}

  @Post()
  async createChallenge(@Body() createChallengeDto: CreateChallengeDto) {
    return await this.challengeService.createChallenge(createChallengeDto);
  }

  @Get()
  async getAllChallenges() {
    return await this.challengeService.getAllChallenges();
  }

  @Get('/:_id')
  async getChallenge(@Param('_id') _id: string) {
    return await this.challengeService.getChallengeById(_id);
  }
}
