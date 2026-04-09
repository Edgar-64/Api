import { Module } from '@nestjs/common';
import { productsService } from './products.service';
import { productsController } from './products.controller';

@Module({
  providers: [productsService],
  controllers: [productsController],
})
export class productsModule {}
