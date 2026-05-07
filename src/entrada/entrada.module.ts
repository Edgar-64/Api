import { Module } from '@nestjs/common';
import { entradaService } from './entrada.service';
import { entradaController } from './entrada.controller';
import { contaModule } from '../conta/conta.module';

@Module({
  imports: [contaModule],
  providers: [entradaService],
  controllers: [entradaController],
})
export class entradaModule {}
