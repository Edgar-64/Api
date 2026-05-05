import { Controller, Post, Body, Put } from '@nestjs/common';
import { Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('id/:id')
  findById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @Get('email/:email')
  findByEmail(@Param('email', ParseIntPipe) email: string) {
    return this.usersService.findByEmail(email);
  }

  @Put(':id')
  alterarSenha(
    @Param('id', ParseIntPipe) id: number, // Adicione o Pipe aqui
    @Body() body: CreateUserDto,
  ) {
    return this.usersService.senha(id, body);
  }

  @Post('signup')
  create(@Body() body: CreateUserDto) {
    // Agora o "body" já vem validado e tipado corretamente
    return this.usersService.create({ data: body });
  }

  @Post('signin')
  login(@Body() body: LoginDto) {
    return this.usersService.login(body);
  }
}
