import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { PayModule } from './pagamentos/pay.module';
import { caixaModule } from './caixinha/caixa.module';
import { servicosModule } from './servicos/servicos.module';
import { contaModule } from './conta/conta.module';
import { entradaModule } from './entrada/entrada.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AdminModule,
    PayModule,
    caixaModule,
    servicosModule,
    contaModule,
    entradaModule,
  ],
})
export class AppModule {}
