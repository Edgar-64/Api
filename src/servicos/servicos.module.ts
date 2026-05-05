import { Module } from '@nestjs/common';
import { servicosService } from './servicos.service';
import { servicosController } from './servicos.controller';

@Module({
  providers: [servicosService],
  controllers: [servicosController],
})
export class servicosModule {}
