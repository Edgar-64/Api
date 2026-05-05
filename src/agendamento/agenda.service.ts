import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AgendaService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.agendado.findMany();
  }

  /*async findByEmail(email: string) {
    return this.prisma.agendado.findUnique({
      
    });
  }*/

  async create(data: {
    descricao: string;
    previsao: number;
    periodo: number;
    valor: number;
  }) {
    return this.prisma.agendado.create({
      data: {
        descricao: data.descricao,
        previsao: data.previsao,
        periodo: data.periodo,
        valor: data.valor,
      },
    });
  }

  async update(
    id: number,
    body: {
      descricao: string;
      previsao: number;
      periodo: number;
      valor: number;
    },
  ) {
    return await this.prisma.agendado.update({
      where: { idAgenda: Number(id) },
      data: body,
    });
  }

  async delete(id: number) {
    return await this.prisma.agendado.delete({
      where: { idAgenda: Number(id) },
    });
  }
}
