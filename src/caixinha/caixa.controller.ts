import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { caixaService } from './caixa.service';
import { Throw } from '@prisma/client';
import { Cax } from '@prisma/client';
import { CreateCaixinhaDto } from './dto/create-caixinha.dto';

@Controller('caixa')
export class caixaController {
  constructor(private caixaService: caixaService) {}

  @Get(':id')
  buscar(@Param('id') id: number) {
    return this.caixaService.buscar(id);
  }

  @Post('registrar')
  registrar(
    @Body()
    body: CreateCaixinhaDto,
  ) {
    return this.caixaService.registrar(body);
  }

  @Put(':id')
  alterar(
    @Param('id') id: number,
    @Body()
    body: {
      meta: string;
      alvo: number;
      caixa: Cax;
      valorMove: number;
      move: Throw;
    },
  ) {
    return this.caixaService.alterar({ id, body });
  }

  @Delete(':id')
  apagar(@Param('id') id: number) {
    return this.caixaService.apagar(id);
  }
}
