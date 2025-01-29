/*
  Warnings:

  - The required column `external_id` was added to the `Campana` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `external_id` was added to the `Cita` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `external_id` was added to the `Tratamiento` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `clave` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - The required column `external_id` was added to the `Usuario` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Campana" ADD COLUMN     "external_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Cita" ADD COLUMN     "external_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tratamiento" ADD COLUMN     "external_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "clave" TEXT NOT NULL,
ADD COLUMN     "external_id" TEXT NOT NULL,
ALTER COLUMN "telefono" DROP NOT NULL,
ALTER COLUMN "foto" DROP NOT NULL,
ALTER COLUMN "direccion" DROP NOT NULL;
