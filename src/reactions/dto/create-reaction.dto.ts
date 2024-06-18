import { IsIn } from 'class-validator';

export class CreateReactionDto {
  @IsIn([['Like', 'Love', 'Haha', 'Sad', 'Angry']])
  reaction: string;
}
