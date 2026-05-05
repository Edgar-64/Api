import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class servicosService {
  constructor(private prisma: PrismaService) {}
}
