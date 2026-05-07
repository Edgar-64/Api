import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { contaService } from './conta.service';
import { CreateContaDto } from './dto/create-conta.dto';
import { CreateEntradaDto } from '../entrada/dto/create-entrada.dto';
import { CreatePayDto } from '../pagamentos/dto/create-pay.dto';

@Controller('conta')
export class contaController {
  constructor(private contaService: contaService) {}

  @Get(':id')
  buscar(@Param('id') id: number) {
    return this.contaService.buscar(id);
  }

  @Post('conta')
  async criar(@Body() createContaDto: CreateContaDto) {
    return this.contaService.criarConta(createContaDto);
  }

  @Post('investir')
  async investimento(@Body() data: CreateEntradaDto) {
    return this.contaService.investir(data);
  }

  @Post('pagar')
  async registrarCompra(@Body() date: CreatePayDto) {
    return this.contaService.debitar(date);
  }
}
