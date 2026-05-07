import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { entradaService } from './entrada.service';
import { contaService } from '../conta/conta.service';
import { CreateEntradaDto } from './dto/create-entrada.dto';

@Controller('entrada')
export class entradaController {
  constructor(
    private entradaService: entradaService,
    private readonly contaService: contaService,
  ) {}

  @Get(':id')
  buscar(@Param('id') id: number) {
    return this.entradaService.buscar(id);
  }

  @Post('investir')
  async investimento(@Body() data: CreateEntradaDto) {
    return (
      this.contaService.investir(data),
      this.entradaService.criarEntrada(data)
    );
  }

  @Post('retirar')
  async retirar(@Body() data: CreateEntradaDto) {
    return (
      this.contaService.retirar(data),
      this.entradaService.criarEntrada(data)
    );
  }
}
