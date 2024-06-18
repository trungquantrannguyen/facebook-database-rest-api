import { IsNotEmpty, IsString } from 'class-validator';

export class CreateShareDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}
