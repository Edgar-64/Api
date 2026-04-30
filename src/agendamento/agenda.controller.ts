import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AgendaService } from './agenda.service';

@Controller('Agenda')
export class AgendaController {
  constructor(private AgendaService: AgendaService) {}

  @Get()
  findAll() {
    return this.AgendaService.findAll();
  }

  @Post('agendar')
  create(
    @Body()
    body: {
      descricao: string;
      previsao: number;
      periodo: number;
      valor: number;
    },
  ) {
    return this.AgendaService.create(body);
  }

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
