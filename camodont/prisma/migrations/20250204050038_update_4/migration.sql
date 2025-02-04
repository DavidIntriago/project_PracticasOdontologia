/*
  Warnings:

  - You are about to drop the column `idCampana` on the `Cita` table. All the data in the column will be lost.
  - You are about to drop the column `idTratamiento` on the `Cita` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cita" DROP CONSTRAINT "Cita_idCampana_fkey";

-- DropForeignKey
ALTER TABLE "Cita" DROP CONSTRAINT "Cita_idTratamiento_fkey";

-- AlterTable
ALTER TABLE "Cita" DROP COLUMN "idCampana",
DROP COLUMN "idTratamiento";
