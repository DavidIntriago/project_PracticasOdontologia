/*
  Warnings:

  - A unique constraint covering the columns `[external_id]` on the table `Servicio` will be added. If there are existing duplicate values, this will fail.
  - The required column `external_id` was added to the `Servicio` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Servicio" ADD COLUMN     "external_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Servicio_external_id_key" ON "Servicio"("external_id");
