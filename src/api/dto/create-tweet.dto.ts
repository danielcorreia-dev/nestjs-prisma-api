import { IsNotEmpty, Length } from 'class-validator';

export class CreateTweetDto {
  @IsNotEmpty()
  @Length(1, 256)
  text: string;
  @IsNotEmpty()
  userId: string;
}
