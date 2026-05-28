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

  @Get('Ex/:id')
  findEx(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Get()
  findByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Put(':id')
  alterarPerfil(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name: string; email: string },
  ) {
    return this.usersService.perfil(id, body);
  }

  @Put('admin/:id')
  alterarPerfilAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      name: string;
      email: string;
      tipo: string;
      planoUser: string;
      status: string;
    },
  ) {
    return this.usersService.perfilAdmin(id, body);
  }

  @Put('senha/:id')
  alterarSenha(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { password: string },
  ) {
    return this.usersService.senha(id, body);
  }

  @Post('cadastro')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.usersService.login(body);
  }
}
