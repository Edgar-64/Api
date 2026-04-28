import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('Admin')
export class AdminController {
  constructor(private AdminService: AdminService) {}

  @Get()
  findAll() {
    return this.AdminService.findAll();
  }

  @Get(':id')
  findByid(id: number) {
    return this.AdminService.findById(id);
  }

  @Post('signup')
  create(@Body() body: { name: string; email: string; password: string }) {
    return this.AdminService.create(body);
  }

  @Post('signin')
  login(@Body() body: { id: number; password: string }) {
    return this.AdminService.login(body);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() body: { name: string; email: string; password: string },
  ) {
    return this.AdminService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.AdminService.delete(id);
  }
}
