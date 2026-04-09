import { Controller, Get, Post, Body } from '@nestjs/common';
import { productsService } from './products.service';

@Controller('products')
export class productsController {
  constructor(private productsService: productsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post('signup')
  create(@Body() body: { name: string; email: string; password: string }) {
    return this.productsService.create(body);
  }

  @Post('signin')
  login(@Body() body: { email: string; password: string }) {
    return this.productsService.login(body);
  }
}
