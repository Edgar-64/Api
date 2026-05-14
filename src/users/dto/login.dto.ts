import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  password!: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email!: string;
}
