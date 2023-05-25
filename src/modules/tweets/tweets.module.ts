import { Module } from '@nestjs/common';
import { TweetsRepository } from './tweets.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { TweetsService } from './tweets.service';

@Module({
  imports: [PrismaModule],
  providers: [TweetsRepository, TweetsService],
  exports: [TweetsService],
})
export class TweetsModule {}
