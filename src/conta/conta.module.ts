import { Module } from '@nestjs/common';
import { contaService } from './conta.service';
import { contaController } from './conta.controller';

@Module({
  providers: [contaService],
  exports: [contaService],
  controllers: [contaController],
})
export class contaModule {}
