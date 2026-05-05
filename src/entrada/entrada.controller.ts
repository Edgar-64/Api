import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { entradaService } from './entrada.service';
import { CreateEntradaDto } from './dto/create-entrada.dto';

@Controller('entrada')
export class entradaController {
  constructor(private entradaService: entradaService) {}

  @Get(':id')
  buscar(@Param('id') id: number) {
    return this.entradaService.buscar(id);
  }

  @Post('entrada')
  criar(@Body() createEntradaDto: CreateEntradaDto) {
    return this.entradaService.criarEntrada(createEntradaDto);
  }
}
