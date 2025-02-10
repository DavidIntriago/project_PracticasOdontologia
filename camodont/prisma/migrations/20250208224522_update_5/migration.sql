/*
  Warnings:

  - A unique constraint covering the columns `[external_id]` on the table `Campana` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[external_id]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Campana_external_id_key" ON "Campana"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_external_id_key" ON "Usuario"("external_id");
