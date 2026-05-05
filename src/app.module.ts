import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { AgendaModule } from './agendamento/agenda.module';
import { PayModule } from './pagamentos/pay.module';
import { caixaModule } from './caixinha/caixa.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AdminModule,
    AgendaModule,
    PayModule,
    caixaModule,
  ],
})
export class AppModule {}
