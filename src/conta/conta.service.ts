/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContaDto } from './dto/create-conta.dto';
import { CreateEntradaDto } from '../entrada/dto/create-entrada.dto';
import { CreatePayDto } from '../pagamentos/dto/create-pay.dto';

@Injectable()
export class contaService {
  constructor(private prisma: PrismaService) {}

  async buscar(id: number) {
    if (!id) {
      throw new BadRequestException('ID da conta não fornecido');
    }
    return this.prisma.conta.findUnique({
      where: { idConta: Number(id) },
      select: {
        idConta: true,
        saldo: true,
        user: true,
      },
    });
  }

  async criarConta(dto: CreateContaDto) {
    return this.prisma.conta.create({
      data: {
        saldo: dto.saldo,
        user: {
          connect: { id: dto.userId },
        },
      },
    });
  }

  async investir(dto: CreateEntradaDto) {
    // IMPORTANTE: Adicione o 'await' antes do $transaction
    return await this.prisma.$transaction(async (tx) => {
      // 1. Tenta atualizar. O update retorna a conta atualizada.
      const conta = await tx.conta
        .update({
          where: { userId: dto.userId },
          data: {
            saldo: { decrement: dto.valorInicial },
          },
        })
        .catch(() => {
          // Se o userId não existir na tabela Conta, o Prisma estoura um erro aqui
          throw new NotFoundException(
            'Conta não encontrada para este usuário.',
          );
        });

      if (conta.saldo < 0) {
        throw new BadRequestException('Saldo insuficiente para investir.');
      }

      return conta;
    });
  }

  async retirar(dto: CreateEntradaDto) {
    return await this.prisma.$transaction(async (tx) => {
      const conta = await tx.conta
        .update({
          where: { userId: dto.userId },
          data: {
            saldo: { increment: dto.valorInicial },
          },
        })
        .catch(() => {
          throw new NotFoundException(
            'Conta não encontrada para este usuário.',
          );
        });

      if (conta.saldo < 0) {
        throw new BadRequestException('Saldo insuficiente para investir.');
      }

      return conta;
    });
  }

  async debitar(dto: CreatePayDto) {
    return await this.prisma.$transaction(async (tx) => {
      const conta = await tx.conta
        .update({
          where: { userId: dto.userId },
          data: {
            saldo: { decrement: dto.valor },
          },
        })
        .catch(() => {
          throw new NotFoundException(
            'Conta não encontrada para este usuário.',
          );
        });

      if (conta.saldo < 0) {
        throw new BadRequestException('Saldo insuficiente para pagar.');
      }

      return conta;
    });
  }

  async ganhar(dto: CreatePayDto) {
    return await this.prisma.$transaction(async (tx) => {
      const conta = await tx.conta
        .update({
          where: { userId: dto.userId },
          data: {
            saldo: { increment: dto.valor },
          },
        })
        .catch(() => {
          throw new NotFoundException(
            'Conta não encontrada para este usuário.',
          );
        });

      if (conta.saldo < 0) {
        throw new BadRequestException('Saldo insuficiente para pagar.');
      }

      return conta;
    });
  }
}
