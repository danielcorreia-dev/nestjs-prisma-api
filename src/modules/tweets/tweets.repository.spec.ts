import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { TweetsRepository } from './tweets.repository';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaService } from '../../database/prisma.service';

describe(`TweetsRepository`, () => {
  let tweetsRepository: TweetsRepository;
  let prismaService: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [TweetsRepository, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    tweetsRepository = moduleRef.get(TweetsRepository);
    prismaService = moduleRef.get(PrismaService);
  });

  describe('createTweet', () => {
    it('should create a new tweet', async () => {
      // Arrange -> Expected result
      const dummyTweet = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        text: 'Galego ta aprendendo back-end',
        userId: 12,
      };
      prismaService.tweet.create.mockResolvedValue(dummyTweet);

      // Act -> Actual test
      const createTweet = () =>
        tweetsRepository.createTweet({
          data: {
            text: dummyTweet.text,
            user: {
              connect: {
                id: dummyTweet.userId,
              },
            },
          },
        });

      // Assert
      await expect(createTweet()).resolves.toBe(dummyTweet);
    });

    it('should throw for 256 character long text', async () => {
      const payload = {
        text: "This is super long text that's over 256 characters.This is super long text that's over 256 characters.This is super long text that's over 256 characters.This is super long text that's over 256 characters.This is super long text that's over 256 characters.This is super long text that's over 256 characters.This is super long text that's over 256 characters.This is super long text that's over 256 characters.This is super long text that's over 256 characters.This is super long text that's over 256 characters.This is super long text that's over 256 characters.This is super long text that's over 256 characters.This is super long text that's over 256 characters.",
        userId: 12,
      };

      const createTweet = async () => {
        return tweetsRepository.createTweet({
          data: {
            text: payload.text,
            user: {
              connect: {
                id: payload.userId,
              },
            },
          },
        });
      };

      // Use try-catch to catch the error thrown by createTweet
      try {
        await createTweet();
      } catch (error) {
        expect(error).toMatchObject({
          statusCode: 400,
          message: ['text must be shorter than or equal to 256 characters'],
          error: 'Bad Request',
        });
      }
    });
  });
});
