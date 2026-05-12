import { Cax, Throw } from '@prisma/client';
import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCaixinhaDto {
  @IsNumber()
  userId!: number;

  @IsPositive({ message: 'Deve ser um valor positivo' })
  valorMove!: number;
  @IsPositive({ message: 'Deve ser um valor positivo' })
  alvo!: number;

  @IsString()
  meta!: string;

  @IsEnum(Cax)
  caixa!: Cax;

  @IsEnum(Throw)
  move!: Throw;
}
