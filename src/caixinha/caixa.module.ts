import { Module } from '@nestjs/common';
import { caixaService } from './caixa.service';
import { caixaController } from './caixa.controller';

@Module({
  providers: [caixaService],
  controllers: [caixaController],
})
export class caixaModule {}
