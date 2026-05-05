import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEntradaDto } from './dto/create-entrada.dto';

@Injectable()
export class entradaService {
  constructor(private prisma: PrismaService) {}

  async buscar(id: number) {
    if (!id) {
      throw new BadRequestException('ID da conta não fornecido');
    }
    return this.prisma.entrada.findUnique({
      where: { idEntrada: Number(id) },
      select: {
        idEntrada: true,
        valorInicial: true,
        user: true,
      },
    });
  }

  async criarEntrada(dto: CreateEntradaDto) {
    return this.prisma.entrada.create({
      data: {
        valorInicial: dto.valorInicial,
        user: {
          connect: { id: dto.userId },
        },
      },
    });
  }
}
