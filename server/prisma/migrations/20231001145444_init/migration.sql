-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER,
    "raca" TEXT NOT NULL,
    "porte" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,
    "fotos" BYTEA[],

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "preferenciaEntrega" TEXT,
    "preferenciaPorte" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adoption" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "adoptedById" INTEGER NOT NULL,
    "petId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "adoption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT,
    "senha" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3),
    "telefone" TEXT,
    "idPets" INTEGER[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
