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

  @Get('id/:id')
  findByid(id: number) {
    return this.AdminService.findById(id);
  }

  @Get('email/:email')
  findByEmail(email: string) {
    return this.AdminService.findByEmail(email);
  }

  @Post('signup')
  create(
    @Body()
    body: {
      name: string;
      email: string;
      password: string;
    },
  ) {
    return this.AdminService.create(body);
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
