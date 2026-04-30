import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PayService } from './pay.service';
import { Process, Throw } from '@prisma/client';

@Controller('Pay')
export class PayController {
  constructor(private PayService: PayService) {}

  @Get()
  findAll() {
    return this.PayService.findAll();
  }

  @Post('pagar')
  pagar(
    @Body()
    body: {
      valor: number;
      tipoLaunch: Throw;
      descricaoLaunch: string;
      statusLaunch: Process;
    },
  ) {
    return this.PayService.create(body);
  }

  @Delete(':id')
  deletar(
    @Param('id')
    id: number,
  ) {
    return this.PayService.delete(id);
  }
}
