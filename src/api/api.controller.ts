import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TweetsService } from 'src/modules/tweets/tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';

@Controller('api')
export class ApiController {
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
