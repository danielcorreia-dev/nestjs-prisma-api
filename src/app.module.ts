import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { TweetsModule } from './modules/tweets/tweets.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [PrismaModule, TweetsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
