import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Removido o 'app.enableCors()' genérico que estava aqui duplicando

  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 2. Configuração unificada e corrigida do CORS
  app.enableCors({
    origin: [
      'http://localhost:8081', // Adicionado (origem exata do erro do seu log)
      'http://172.17.240.1:8081', // Mobile via IP físico
      'http://localhost:3000', // Frontend local
      'http://172.17.240.1:3000', // Frontend via IP físico
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
    ], // Garantia extra para o preflight
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
}
bootstrap();
