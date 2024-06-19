import { IsString } from 'class-validator';

export class CreateCommentDto {
  content: string;
  image: string;
}
