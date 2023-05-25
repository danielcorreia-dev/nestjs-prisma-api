import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { TweetsModule } from './modules/tweets/tweets.module';

@Module({
  imports: [PrismaModule, TweetsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
