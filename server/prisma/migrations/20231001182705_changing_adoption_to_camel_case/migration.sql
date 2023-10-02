/*
  Warnings:

  - You are about to drop the `adoption` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "adoption";

-- CreateTable
CREATE TABLE "Adoption" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "adoptedById" INTEGER NOT NULL,
    "petId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Adoption_pkey" PRIMARY KEY ("id")
);
