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

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tipo" "Tipo" NOT NULL DEFAULT 'USER',
    "status" "Status" NOT NULL DEFAULT 'ATIVO',
    "planoUser" "Plan" NOT NULL DEFAULT 'BASICO',
    "entradaPrincipal" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conta" (
    "idConta" SERIAL NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,

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
    "mes" DOUBLE PRECISION NOT NULL,
    "limite" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Orcamento_pkey" PRIMARY KEY ("idOrc")
);

-- CreateTable
CREATE TABLE "servico" (
    "idServ" SERIAL NOT NULL,
    "nameServ" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "beneficios" TEXT NOT NULL,

    CONSTRAINT "servico_pkey" PRIMARY KEY ("idServ")
);

-- CreateTable
CREATE TABLE "Caixinha" (
    "idCaixa" SERIAL NOT NULL,
    "meta" TEXT NOT NULL,
    "alvo" DOUBLE PRECISION NOT NULL,
    "caixa" "Cax" NOT NULL,
    "valorMove" DOUBLE PRECISION NOT NULL,
    "move" "Throw" NOT NULL,

    CONSTRAINT "Caixinha_pkey" PRIMARY KEY ("idCaixa")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
