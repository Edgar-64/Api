import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // 1. Criamos um pool de conexão usando a URL do seu .env
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    
    // 2. Criamos o adaptador do Prisma para Postgres
    const adapter = new PrismaPg(pool);

    // 3. Passamos o adaptador para a classe base do Prisma
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}