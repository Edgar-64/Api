import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { PayService } from './pay.service';
import { CreatePayDto } from './dto/create-pay.dto';

@Controller('Pay')
export class PayController {
  constructor(private PayService: PayService) {}

  @Get()
  findAll() {
    return this.PayService.findAll();
  }

  @Post('pagar')
  pagar(@Body() createPayDto: CreatePayDto) {
    return this.PayService.create(createPayDto);
  }

  @Delete(':id')
  deletar(
    @Param('id')
    id: number,
  ) {
    return this.PayService.delete(id);
  }

  @Get(':id/contas')
  findByEmail(@Param('id') id: number, @Query('filtro') filtro: string) {
    return this.PayService.findByEmail(id, filtro);
  }
}
