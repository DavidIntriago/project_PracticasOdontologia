/*
  Warnings:

  - You are about to drop the column `external_id` on the `Cita` table. All the data in the column will be lost.
  - You are about to drop the column `idUsuario` on the `Cita` table. All the data in the column will be lost.
  - You are about to drop the column `external_id` on the `Tratamiento` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idCita]` on the table `Tratamiento` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[correo]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dentistaId` to the `Cita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idCampana` to the `Cita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pacienteId` to the `Cita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idCita` to the `Tratamiento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cita" DROP CONSTRAINT "Cita_idUsuario_fkey";

-- DropIndex
DROP INDEX "Cita_idServicio_key";

-- AlterTable
ALTER TABLE "Cita" DROP COLUMN "external_id",
DROP COLUMN "idUsuario",
ADD COLUMN     "dentistaId" INTEGER NOT NULL,
ADD COLUMN     "idCampana" INTEGER NOT NULL,
ADD COLUMN     "pacienteId" INTEGER NOT NULL,
ALTER COLUMN "hora" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Tratamiento" DROP COLUMN "external_id",
ADD COLUMN     "idCita" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tratamiento_idCita_key" ON "Tratamiento"("idCita");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_idCampana_fkey" FOREIGN KEY ("idCampana") REFERENCES "Campana"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_dentistaId_fkey" FOREIGN KEY ("dentistaId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tratamiento" ADD CONSTRAINT "Tratamiento_idCita_fkey" FOREIGN KEY ("idCita") REFERENCES "Cita"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
