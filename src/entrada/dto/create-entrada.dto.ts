import { IsNumber, IsPositive } from 'class-validator';

export class CreateEntradaDto {
  @IsNumber()
  @IsPositive({ message: 'Deve ser um valor positivo' })
  valorInicial!: number;

  @IsNumber()
  userId!: number;
}
