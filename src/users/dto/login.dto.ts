import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email!: string;
}
