import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import bcrypt from 'bcrypt';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAdminDto) {
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
        planoUser: data.planoUser,
        status: data.status,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        tipo: true,
        status: true,
        planoUser: true,
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
        caixa: {
          select: {
            meta: true,
            alvo: true,
            caixa: true,
          },
        },
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
        tipo: true,
        status: true,
        planoUser: true,
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
        caixa: {
          select: {
            meta: true,
            alvo: true,
            caixa: true,
          },
        },
      },
    });
  }

  async delete(id: number) {
    return this.prisma.user.delete({
      where: { id: Number(id) },
    });
  }

  async update(
    id: number,
    body: { name: string; email: string; password: string },
  ) {
    return await this.prisma.user.update({
      where: { id: Number(id) },
      data: body,
    });
  }
}
