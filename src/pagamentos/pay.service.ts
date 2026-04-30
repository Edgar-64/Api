import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Process, Throw } from '@prisma/client';

@Injectable()
export class PayService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.lancamento.findMany();
  }

  async create(data: {
    valor: number;
    tipoLaunch: Throw;
    descricaoLaunch: string;
    statusLaunch: Process;
  }) {
    return this.prisma.lancamento.create({
      data: {
        valor: data.valor,
        tipoLaunch: data.tipoLaunch,
        descricaoLaunch: data.descricaoLaunch,
        statusLaunch: data.statusLaunch,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.lancamento.delete({
      where: { idLaunch: Number(id) },
    });
  }
}
