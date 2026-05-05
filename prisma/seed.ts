import 'dotenv/config';
import { Plan, Tipo, Status } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

async function main() {
  const password = await bcrypt.hash('123456', 10);
  const planos = [
    {
      nameServ: 'Plano Bronze',
      preco: 29.9,
      beneficios: 'Acesso básico, 1 usuário, Suporte via email',
    },
    {
      nameServ: 'Plano Prata',
      preco: 59.9,
      beneficios: 'Acesso intermediário, 3 usuários, Suporte prioritário',
    },
    {
      nameServ: 'Plano Ouro',
      preco: 99.9,
      beneficios: 'Acesso total, 10 usuários, Consultoria mensal',
    },
    {
      nameServ: 'Plano VIP',
      preco: 199.9,
      beneficios:
        'Tudo ilimitado, Gerente de conta exclusivo, Acesso antecipado',
    },
  ];

  for (const plano of planos) {
    await prisma.service.upsert({
      where: { idServ: 0 },
      update: {},
      create: plano,
    });
  }

  await prisma.user.upsert({
    where: { email: 'admin@email.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@email.com',
      password,
      tipo: Tipo.ADMIN,
      status: Status.ATIVO,
      planoUser: Plan.ADMIN,
    },
  });

  /*await prisma.servico.create({
    data: {
      nameServ: 'Básico',
      preco: 100,
      beneficios: 'Acesso limitado ao sistema',
    },
  });*/
}

main()
  .then(() => console.log('Seed executado'))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
