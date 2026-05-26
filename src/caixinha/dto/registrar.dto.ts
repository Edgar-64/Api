import { IsNumber, IsPositive } from 'class-validator';

export class AdicionarDto {
  @IsNumber()
  idCaixa!: number;
  @IsNumber()
  userId!: number;

  @IsNumber()
  @IsPositive({ message: 'Deve ser um valor positivo' })
  valor!: number;
}
