import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { Process, Throw } from '@prisma/client';

export class CreatePayDto {
  @IsString()
  descricaoLaunch!: string;

  @IsEnum(Process, {
    message: 'O valor da role é inválido',
  })
  @IsNotEmpty()
  statusLaunch!: Process;

  @IsEnum(Throw, {
    message: 'O valor da role é inválido',
  })
  @IsNotEmpty()
  tipoLaunch!: Throw;

  @IsNumber()
  @IsPositive({ message: 'O saldo deve ser um valor positivo' })
  valor!: number;

  @IsNumber()
  userId!: number;
  @IsNotEmpty()
  contaId!: number;
}
