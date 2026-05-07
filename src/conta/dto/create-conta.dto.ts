import { IsNumber, IsPositive } from 'class-validator';

export class CreateContaDto {
  @IsNumber()
  @IsPositive({ message: 'O saldo deve ser um valor positivo' })
  saldo!: number;

  @IsNumber()
  userId!: number;
}
