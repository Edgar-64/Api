import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string; // O '!' resolve o erro TS2564

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}
