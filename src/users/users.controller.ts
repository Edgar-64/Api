import { Controller, Post, Body } from '@nestjs/common';
import { Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Get(':email')
  findByEmail(@Param('email', ParseIntPipe) email: string) {
    return this.usersService.findByEmail(email);
  }

  @Post('signup')
  create(@Body() body: { name: string; email: string; password: string }) {
    return this.usersService.create(body);
  }

  @Post('signin')
  login(@Body() body: { id: number; password: string }) {
    return this.usersService.login(body);
  }
}
