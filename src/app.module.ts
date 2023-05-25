import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { TweetsModule } from './modules/tweets/tweets.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [PrismaModule, TweetsModule, ApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
