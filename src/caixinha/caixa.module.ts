import { Module } from '@nestjs/common';
import { caixaService } from './caixa.service';
import { caixaController } from './caixa.controller';
import { contaModule } from '../conta/conta.module';

@Module({
  imports: [contaModule],
  providers: [caixaService],
  controllers: [caixaController],
})
export class caixaModule {}
