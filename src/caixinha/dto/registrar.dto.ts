import { IsNumber, IsPositive } from 'class-validator';

export class AdicionarDto {
  @IsNumber()
  userId!: number;
  idCaixa!: number;

  @IsPositive({ message: 'Deve ser um valor positivo' })
  valor!: number;
}
