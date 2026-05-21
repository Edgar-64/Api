import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cax, Throw } from '@prisma/client';
import { CreateCaixinhaDto } from './dto/create-caixinha.dto';
import { AdicionarDto } from './dto/registrar.dto';

@Injectable()
export class caixaService {
  constructor(private prisma: PrismaService) {}

  async buscar(id: number) {
    return this.prisma.caixinha.findMany({
      where: { userId: Number(id) },
      select: {
        idCaixa: true,
        meta: true,
        alvo: true,
        caixa: true,
        valor: true,
        userId: true,
      },
    });
  }

  async registrar(data: CreateCaixinhaDto) {
    const valor = 0;
    return this.prisma.caixinha.create({
      data: {
        meta: data.meta,
        alvo: data.alvo,
        caixa: data.caixa,
        valor: valor,
        userId: data.userId,
      },
    });
  }

  async adicionar(dto: AdicionarDto) {
    return await this.prisma.$transaction(async (tx) => {
      const conta = await tx.caixinha
        .update({
          where: {
            idCaixa: dto.idCaixa,
          },
          data: {
            valor: { increment: dto.valor },
          },
        })
        .catch((err) => {
          console.error(err);
          throw new NotFoundException('Caixinha não encontrada.');
        });

      return conta;
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
