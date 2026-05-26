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
import { AdicionarDto } from './dto/registrar.dto';

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

  @Post('registrar')
  registrar(
    @Body()
    data: CreateCaixinhaDto,
  ) {
    return this.caixaService.registrar(data);
  }

  @Post('recuperar')
  async recuperar(@Body() data: AdicionarDto) {
    // Executa ambas as operações em paralelo e aguarda a conclusão de ambas
    const [contaResultado, caixaResultado] = await Promise.all([
      this.contaService.recuperar(data),
      this.caixaService.remover(data),
    ]);

    // Retorna um objeto JSON claro para o Front-end
    return {
      sucesso: true,
      conta: contaResultado,
      caixa: caixaResultado,
    };
  }

  @Post('guardar')
  async guardar(@Body() data: AdicionarDto) {
    // Executa ambas as operações em paralelo
    const [contaResultado, caixaResultado] = await Promise.all([
      this.contaService.guardar(data),
      this.caixaService.adicionar(data),
    ]);

    return {
      sucesso: true,
      conta: contaResultado,
      caixa: caixaResultado,
    };
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
