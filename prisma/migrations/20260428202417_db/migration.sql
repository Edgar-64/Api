-- CreateEnum
CREATE TYPE "Tipo" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ATIVO', 'INATIVO');

-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('BASICO', 'INTERMEDIARIO', 'AVANCADO', 'ADMIN');

-- CreateEnum
CREATE TYPE "Throw" AS ENUM ('ENTRADA', 'SAIDA');

-- CreateEnum
CREATE TYPE "Process" AS ENUM ('PROCESSANDO', 'PROCESSADO');

-- CreateEnum
CREATE TYPE "Cax" AS ENUM ('ABERTA', 'FECHADA');

-- CreateEnum
CREATE TYPE "Mov" AS ENUM ('ENTRADA', 'SAIDA');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tipo" "Tipo" NOT NULL DEFAULT 'USER',
    "status" "Status" NOT NULL DEFAULT 'INATIVO',
    "plano" "Plan" NOT NULL DEFAULT 'BASICO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conta" (
    "idConta" SERIAL NOT NULL,
    "nameConta" TEXT NOT NULL,
    "conta" "Tipo" NOT NULL DEFAULT 'USER',
    "saldo" DOUBLE PRECISION NOT NULL,
    "ativ" "Status" NOT NULL DEFAULT 'INATIVO',

    CONSTRAINT "Conta_pkey" PRIMARY KEY ("idConta")
);

-- CreateTable
CREATE TABLE "Agendado" (
    "idAgenda" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "previsao" DOUBLE PRECISION NOT NULL,
    "periodo" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Agendado_pkey" PRIMARY KEY ("idAgenda")
);

-- CreateTable
CREATE TABLE "Lancamento" (
    "idLaunch" SERIAL NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "tipoLaunch" "Throw" NOT NULL,
    "descricaoLaunch" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusLaunch" "Process" NOT NULL DEFAULT 'PROCESSANDO',

    CONSTRAINT "Lancamento_pkey" PRIMARY KEY ("idLaunch")
);

-- CreateTable
CREATE TABLE "Orcamento" (
    "idOrc" SERIAL NOT NULL,
    "mes" INTEGER NOT NULL DEFAULT (extract(month from now()))::int,
    "limite" TEXT NOT NULL,

    CONSTRAINT "Orcamento_pkey" PRIMARY KEY ("idOrc")
);

-- CreateTable
CREATE TABLE "Plano" (
    "idPlan" SERIAL NOT NULL,
    "namePlan" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "beneficios" TEXT NOT NULL,

    CONSTRAINT "Plano_pkey" PRIMARY KEY ("idPlan")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "idCat" SERIAL NOT NULL,
    "nameCat" TEXT NOT NULL,
    "tipoCat" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("idCat")
);

-- CreateTable
CREATE TABLE "Caixinha" (
    "idCaixa" SERIAL NOT NULL,
    "meta" TEXT NOT NULL,
    "alvo" DOUBLE PRECISION NOT NULL,
    "caixa" "Cax" NOT NULL,

    CONSTRAINT "Caixinha_pkey" PRIMARY KEY ("idCaixa")
);

-- CreateTable
CREATE TABLE "MovimentoCaixa" (
    "idMove" SERIAL NOT NULL,
    "valorMove" DOUBLE PRECISION NOT NULL,
    "move" "Mov" NOT NULL,

    CONSTRAINT "MovimentoCaixa_pkey" PRIMARY KEY ("idMove")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
