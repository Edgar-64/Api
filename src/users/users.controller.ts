import { Controller, Post, Body, Put, Query } from '@nestjs/common';
import { Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Get()
  findByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Put(':id')
  alterarSenha(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateUserDto,
  ) {
    return this.usersService.senha(id, body);
  }

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('signin')
  login(@Body() body: LoginDto) {
    return this.usersService.login(body);
  }
}
