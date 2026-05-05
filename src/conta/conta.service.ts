import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContaDto } from '../users/dto/create-conta.dto';

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
}
