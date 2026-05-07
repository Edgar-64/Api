import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Plan, Status, Tipo } from '@prisma/client';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  name!: string; // O '!' resolve o erro TS2564

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsEnum(Tipo)
  tipo!: Tipo;

  @IsEnum(Status)
  status!: Status;

  @IsEnum(Plan)
  planoUser!: Plan;
}
