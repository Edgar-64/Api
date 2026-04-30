import { Module } from '@nestjs/common';
import { OrcService } from './orc.service';
import { OrcController } from './orc.controller';

@Module({
  providers: [OrcService],
  controllers: [OrcController],
})
export class OrcModule {}
