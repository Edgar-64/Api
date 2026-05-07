import { Module } from '@nestjs/common';
import { PayService } from './pay.service';
import { PayController } from './pay.controller';
import { contaModule } from '../conta/conta.module';

@Module({
  imports: [contaModule],
  providers: [PayService],
  controllers: [PayController],
})
export class PayModule {}
