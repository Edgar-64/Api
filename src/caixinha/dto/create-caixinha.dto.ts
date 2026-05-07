import { Cax, Throw } from '@prisma/client';
import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCaixinhaDto {
  @IsNumber()
  userId!: number;
  @IsPositive({ message: 'O saldo deve ser um valor positivo' })
  alvo!: number;
  valorMove!: number;

  @IsString()
  meta!: string;

  @IsEnum(Cax)
  caixa!: Cax;

  @IsEnum(Throw)
  move!: Throw;
}
