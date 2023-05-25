import { Injectable } from '@nestjs/common';
import { Tweet, User } from '@prisma/client';
import { TweetsRepository } from './tweets.repository';

@Injectable()
export class TweetsService {
  constructor(private repository: TweetsRepository) {}

  async createTweet(params: { text: Tweet[`text`]; userId: User[`id`] }) {
    const { text, userId } = params;

    // call repository layer
    const tweet = await this.repository.createTweet({
      data: {
        text,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    // do other things in the service layer... e.g. send email of tweet

    return tweet;
  }

  async getTweets() {
    const tweets = await this.repository.getTweets({});
    return tweets;
  }

  async updateTweet(params: {
    id: Tweet[`id`];
    text: Tweet[`text`];
    userId: User[`id`];
  }) {
    const { id, text } = params;

    const updatedTweet = await this.repository.updateTweet({
      where: {
        id,
      },
      data: {
        text,
      },
    });

    return updatedTweet;
  }

  async deleteTweet(params: { id: Tweet[`id`] }) {
    const { id } = params;

    return this.repository.deleteTweet({
      where: {
        id,
      },
    });
  }
}
