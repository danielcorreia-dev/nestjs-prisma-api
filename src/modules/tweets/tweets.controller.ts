import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { TweetsService } from './tweets.service';

@Controller('')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Get('tweets')
  async getTweets() {
    return this.tweetsService.getTweets();
  }

  @Post('tweet')
  async createTweet(@Body() createTweetDto: CreateTweetDto) {
    const { text, userId } = createTweetDto;

    return this.tweetsService.createTweet({
      text,
      userId: Number(userId),
    });
  }

  @Patch('tweet/:id')
  async updateTweet(
    @Param('id') id: string,
    @Body() updateTweetDto: UpdateTweetDto,
  ) {
    const { text, userId } = updateTweetDto;

    return this.tweetsService.updateTweet({
      id: Number(id),
      text,
      userId: Number(userId),
    });
  }

  @Delete('tweet/:id')
  async deleteTweet(@Param('id') id: string) {
    return this.tweetsService.deleteTweet({ id: Number(id) });
  }
}
