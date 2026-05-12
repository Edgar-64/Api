import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cax, Throw } from '@prisma/client';
import { CreateCaixinhaDto } from './dto/create-caixinha.dto';

@Injectable()
export class caixaService {
  constructor(private prisma: PrismaService) {}

  async buscar(id: number) {
    return this.prisma.caixinha.findUnique({
      where: { idCaixa: Number(id) },
      select: {
        idCaixa: true,
        meta: true,
        alvo: true,
        caixa: true,
        valorMove: true,
        move: true,
      },
    });
  }

  async registrar(data: CreateCaixinhaDto) {
    return this.prisma.caixinha.create({
      data: {
        meta: data.meta,
        alvo: data.alvo,
        caixa: data.caixa,
        valorMove: data.valorMove,
        move: data.move,
        userId: data.userId,
      },
    });
  }

  async alterar({
    id,
    body,
  }: {
    id: number;
    body: {
      meta: string;
      alvo: number;
      caixa: Cax;
      valorMove: number;
      move: Throw;
    };
  }) {
    return this.prisma.caixinha.update({
      where: { idCaixa: Number(id) },
      data: body,
    });
  }

  async apagar(id: number) {
    return this.prisma.caixinha.delete({
      where: { idCaixa: Number(id) },
    });
  }
}
