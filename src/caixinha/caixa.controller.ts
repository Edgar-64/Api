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
import { contaService } from '../conta/conta.service';
import { CreateCaixinhaDto } from './dto/create-caixinha.dto';

@Controller('caixa')
export class caixaController {
  constructor(
    private caixaService: caixaService,
    private readonly contaService: contaService,
  ) {}

  @Get(':id')
  buscar(@Param('id') id: number) {
    return this.caixaService.buscar(id);
  }

  @Post('guardar')
  async guardar(@Body() data: CreateCaixinhaDto) {
    return (this.contaService.guardar(data), this.caixaService.registrar(data));
  }

  @Post('recuperar')
  async recuperar(
    @Body()
    data: CreateCaixinhaDto,
  ) {
    return (
      this.contaService.recuperar(data),
      this.caixaService.registrar(data)
    );
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
