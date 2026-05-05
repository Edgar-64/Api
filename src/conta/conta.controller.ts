import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { contaService } from './conta.service';
import { CreateContaDto } from '../users/dto/create-conta.dto';

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
}
