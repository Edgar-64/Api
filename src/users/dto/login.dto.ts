import { Tipo } from '@prisma/client';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  password!: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email!: string;

  @IsEnum(Tipo)
  tipo!: Tipo;
}
