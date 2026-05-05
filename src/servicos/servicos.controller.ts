import { Get, Controller } from '@nestjs/common';
import { servicosService } from './servicos.service';

@Controller('servicos')
export class servicosController {
  constructor(private servicosService: servicosService) {}

  @Get()
  findAll() {
    return this.servicosService.findAll();
  }
}
