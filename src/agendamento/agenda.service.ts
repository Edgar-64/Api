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
      where: { userEmail: String(email) },
      select: {
        idAgenda: true,
        descricao: true,
        previsao: true,
        periodo: true,
        valor: true,
      },
    });
  }

  async criarData(dto: CreateDataDto) {
    return this.prisma.agendado.create({
      data: {
        descricao: dto.descricao,
        periodo: dto.periodo,
        previsao: dto.previsao,
        valor: dto.valor,
        user: {
          connect: { id: dto.userId },
        },
      },
    });
  }*/

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
