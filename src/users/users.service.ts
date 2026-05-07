import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (userExists) {
      throw new BadRequestException('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        tipo: dto.tipo,
        status: dto.status,
        planoUser: dto.planoUser,
      },
    });
  }

  async senha(
    id: number,
    body: { name: string; email: string; password: string },
  ) {
    return await this.prisma.user.update({
      where: { id: Number(id) },
      data: body,
    });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        contas: {
          select: {
            saldo: true,
          },
        },
        entradas: {
          select: {
            valorInicial: true,
          },
        },
        operacoes: {
          select: {
            valor: true,
            tipoLaunch: true,
            descricaoLaunch: true,
            statusLaunch: true,
          },
        },
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: String(email) },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        contas: {
          select: {
            saldo: true,
          },
        },
        entradas: {
          select: {
            valorInicial: true,
          },
        },
        operacoes: {
          select: {
            valor: true,
            tipoLaunch: true,
            descricaoLaunch: true,
            statusLaunch: true,
          },
        },
      },
    });
  }

  async login(data: { id: number; password: string }) {
    const user = await this.findById(data.id);

    if (!user || !user.password) {
      console.log('Inválido');
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isValid = await bcrypt.compare(data.password, user.password);

    if (!isValid) {
      console.log('Inválido');
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return {
      message: 'Login realizado com sucesso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
