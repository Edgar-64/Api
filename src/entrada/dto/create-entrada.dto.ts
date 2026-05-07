import { Throw } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateEntradaDto {
  @IsEnum(Throw)
  @IsNotEmpty()
  tipoConta!: Throw;

  @IsNumber()
  @IsPositive({ message: 'Deve ser um valor positivo' })
  valorInicial!: number;

  @IsNumber()
  userId!: number;
  @IsNotEmpty()
  contaId!: number;
}
