import { Controller, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { AgendaService } from './agenda.service';

@Controller('Agenda')
export class AgendaController {
  constructor(private AgendaService: AgendaService) {}

  @Get(':email')
  findAll() {
    return this.AgendaService.findAll();
  }

  /*@Post('agendar')
  async criar(@Body() createDataDto: CreateDataDto) {
    return this.AgendaService.criarData(createDataDto);
  }*/

  @Put(':id')
  alterar(
    @Param('id')
    id: number,
    @Body()
    body: {
      descricao: string;
      previsao: number;
      periodo: number;
      valor: number;
    },
  ) {
    return this.AgendaService.update(id, body);
  }

  @Delete(':id')
  deletar(@Param('id') id: number) {
    return this.AgendaService.delete(id);
  }
}
