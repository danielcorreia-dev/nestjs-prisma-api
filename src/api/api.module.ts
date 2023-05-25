import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { TweetsModule } from 'src/modules/tweets/tweets.module';

@Module({
  imports: [TweetsModule],
  controllers: [ApiController],
})
export class ApiModule {}
