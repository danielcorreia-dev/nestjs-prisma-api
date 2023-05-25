import { Module } from '@nestjs/common';
import { TweetsRepository } from './tweets.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { TweetsService } from './tweets.service';
import { TweetsController } from './tweets.controller';

@Module({
  imports: [PrismaModule],
  controllers: [TweetsController],
  providers: [TweetsRepository, TweetsService],
  exports: [TweetsService],
})
export class TweetsModule {}
