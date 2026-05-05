import { Module } from '@nestjs/common';
import { entradaService } from './entrada.service';
import { entradaController } from './entrada.controller';

@Module({
  providers: [entradaService],
  controllers: [entradaController],
})
export class entradaModule {}
