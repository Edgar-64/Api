import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePayDto } from './dto/create-pay.dto';

@Injectable()
export class PayService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.lancamento.findMany();
  }

  async create(dto: CreatePayDto) {
    return this.prisma.lancamento.create({
      data: {
        valor: dto.valor,
        tipoLaunch: dto.tipoLaunch,
        descricaoLaunch: dto.descricaoLaunch,
        statusLaunch: dto.statusLaunch,
        user: {
          connect: { id: dto.userId },
        },
        conta: {
          connect: { idConta: dto.contaId },
        },
      },
    });
  }

  async delete(id: number) {
    return this.prisma.lancamento.delete({
      where: { idLaunch: Number(id) },
    });
  }

  async filtro(id: number, filtro: string) {
    return this.prisma.lancamento.findMany({
      where: {
        userId: Number(id),
        descricaoLaunch: {
          contains: filtro,
        },
      },
    });
  }
}
