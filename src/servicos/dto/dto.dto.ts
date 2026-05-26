import { IsNumber } from 'class-validator';

export class Dto {
  @IsNumber()
  userId!: number;
}
