/*
  Warnings:

  - You are about to drop the column `idCampana` on the `Servicio` table. All the data in the column will be lost.
  - Added the required column `idServicio` to the `Campana` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Servicio" DROP CONSTRAINT "Servicio_idCampana_fkey";

-- AlterTable
ALTER TABLE "Campana" ADD COLUMN     "idServicio" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Servicio" DROP COLUMN "idCampana";

-- AddForeignKey
ALTER TABLE "Campana" ADD CONSTRAINT "Campana_idServicio_fkey" FOREIGN KEY ("idServicio") REFERENCES "Servicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
