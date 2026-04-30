import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import bcrypt from 'bcrypt';
import { Plan, Status, Tipo } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create({
    data,
  }: {
    data: {
      name: string;
      email: string;
      password: string;
      tipo: Tipo;
      status: Status;
      planoUser: Plan;
    };
  }) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      throw new BadRequestException('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        tipo: data.tipo,
        status: data.status,
        planoUser: data.planoUser,
      },
    });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
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
