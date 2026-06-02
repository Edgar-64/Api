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

  console.log('Passo 1: Criando ou atualizando o usuário Admin...');
  // 1. Criamos o usuário primeiro para garantir que o ID dele exista no banco
  const adminUser = await prisma.user.upsert({
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

  console.log(`Usuário Admin pronto (ID: ${adminUser.id}). Criando planos...`);

  // 2. Mapeamos os planos usando o ID real gerado pelo banco para o adminUser
  const planos = [
    {
      nameServ: 'Plano Básico',
      preco: 29.9,
      beneficios: 'Acesso básico, 1 usuário, Suporte via email',
      userId: adminUser.id, // Vincula dinamicamente ao ID do Admin criado acima
    },
    {
      nameServ: 'Plano Médio',
      preco: 59.9,
      beneficios: 'Acesso intermediário, 3 usuários, Suporte prioritário',
      userId: adminUser.id,
    },
    {
      nameServ: 'Plano VIP',
      preco: 99.9,
      beneficios: 'Acesso total, 10 usuários, Consultoria mensal',
      userId: adminUser.id,
    },
  ];

  // 3. Rodamos o upsert buscando pelo nome único do serviço (ajuste o 'where' se o seu schema for diferente)
  // 1. Opcional: Limpa os planos antigos para evitar duplicados ao rodar o seed de novo
  await prisma.service.deleteMany({});

  // 2. Loop correto usando o .create()
  for (const plano of planos) {
    await prisma.service.create({
      data: plano, // O .create() só aceita a propriedade 'data'
    });
  }
}

main()
  .then(() => console.log('🚀 Seed executado com sucesso!'))
  .catch((err) => {
    console.error('❌ Erro ao executar o seed:');
    console.error(err);
  })
  .finally(() => prisma.$disconnect());
