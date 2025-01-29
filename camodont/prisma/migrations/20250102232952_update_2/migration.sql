/*
  Warnings:

  - You are about to drop the column `idServicio` on the `Campana` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Campana" DROP CONSTRAINT "Campana_idServicio_fkey";

-- AlterTable
ALTER TABLE "Campana" DROP COLUMN "idServicio";

-- CreateTable
CREATE TABLE "_CampanaServicio" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CampanaServicio_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CampanaServicio_B_index" ON "_CampanaServicio"("B");

-- AddForeignKey
ALTER TABLE "_CampanaServicio" ADD CONSTRAINT "_CampanaServicio_A_fkey" FOREIGN KEY ("A") REFERENCES "Campana"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampanaServicio" ADD CONSTRAINT "_CampanaServicio_B_fkey" FOREIGN KEY ("B") REFERENCES "Servicio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
