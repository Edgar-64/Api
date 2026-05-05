import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsInt()
  @IsNotEmpty()
  id!: number;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
