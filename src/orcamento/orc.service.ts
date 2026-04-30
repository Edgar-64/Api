import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrcService {
  constructor(private prisma: PrismaService) {}
}