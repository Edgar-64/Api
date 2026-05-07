import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
        tipoConta: true,
        criado: true,
        dataResgate: true,
        user: true,
      },
    });
  }

  async criarEntrada(dto: CreateEntradaDto) {
    const dataAtual = new Date();

    const seismeses = new Date();
    seismeses.setMonth(dataAtual.getMonth() + 6);

    return this.prisma.entrada.create({
      data: {
        valorInicial: dto.valorInicial,
        tipoConta: dto.tipoConta,
        dataResgate: seismeses,
        user: {
          connect: { id: dto.userId },
        },
        conta: {
          connect: { idConta: dto.contaId },
        },
      },
    });
  }

  async rendimento(id: number) {
    const investimento = await this.prisma.entrada.findUnique({
      where: { idEntrada: id },
    });

    if (!investimento) {
      throw new NotFoundException(`Investimento com ID ${id} não encontrado.`);
    }

    const agora = new Date();

    if (agora < investimento.dataResgate) {
      throw new BadRequestException(
        'O investimento ainda não completou 6 meses.',
      );
    }

    const valorMultiplicado = (investimento.valorInicial * 116) / 100;

    // Atualiza a conta do usuário com o novo saldo
    await this.prisma.conta.update({
      where: { userId: investimento.userId },
      data: {
        saldo: { increment: valorMultiplicado },
      },
    });

    // Marca como finalizado para não resgatar duas vezes
    return this.prisma.entrada.update({
      where: { idEntrada: id },
      data: { finalizado: true },
    });
  }
}
