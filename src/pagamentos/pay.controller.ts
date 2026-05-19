import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { PayService } from './pay.service';
import { contaService } from '../conta/conta.service';
import { CreatePayDto } from './dto/create-pay.dto';

@Controller('Pay')
export class PayController {
  constructor(
    private PayService: PayService,
    private readonly contaService: contaService,
  ) {}

  @Get()
  findAll() {
    return this.PayService.findAll();
  }

  @Delete(':id')
  deletar(
    @Param('id')
    id: number,
  ) {
    return this.PayService.delete(id);
  }

  @Get(':id/contas')
  findByEmail(@Param('id') id: number, @Query('filtro') filtro: string) {
    return this.PayService.filtro(id, filtro);
  }

  @Post('pagar')
  async registrarCompra(@Body() date: CreatePayDto) {
    return (this.contaService.debitar(date), this.PayService.create(date));
  }

  @Post('receber')
  async receberValor(@Body() date: CreatePayDto) {
    return (this.contaService.ganhar(date), this.PayService.create(date));
  }
}
