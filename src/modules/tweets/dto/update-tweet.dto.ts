import { IsNotEmpty } from 'class-validator';

export class UpdateTweetDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  userId: string;
}
