/*
  Warnings:

  - You are about to drop the column `idEstudiante` on the `Cita` table. All the data in the column will be lost.
  - You are about to drop the column `idPaciente` on the `Cita` table. All the data in the column will be lost.
  - You are about to drop the `Estudiante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EstudianteOnCampana` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Paciente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PacienteOnCampana` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idUsuario` to the `Cita` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cita" DROP CONSTRAINT "Cita_idEstudiante_fkey";

-- DropForeignKey
ALTER TABLE "Cita" DROP CONSTRAINT "Cita_idPaciente_fkey";

-- DropForeignKey
ALTER TABLE "EstudianteOnCampana" DROP CONSTRAINT "EstudianteOnCampana_idCampana_fkey";

-- DropForeignKey
ALTER TABLE "EstudianteOnCampana" DROP CONSTRAINT "EstudianteOnCampana_idEstudiante_fkey";

-- DropForeignKey
ALTER TABLE "PacienteOnCampana" DROP CONSTRAINT "PacienteOnCampana_idCampana_fkey";

-- DropForeignKey
ALTER TABLE "PacienteOnCampana" DROP CONSTRAINT "PacienteOnCampana_idPaciente_fkey";

-- AlterTable
ALTER TABLE "Cita" DROP COLUMN "idEstudiante",
DROP COLUMN "idPaciente",
ADD COLUMN     "idUsuario" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Estudiante";

-- DropTable
DROP TABLE "EstudianteOnCampana";

-- DropTable
DROP TABLE "Paciente";

-- DropTable
DROP TABLE "PacienteOnCampana";

-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "idRol" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "cicloAcademico" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioCampana" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idCampana" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsuarioCampana_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_idRol_fkey" FOREIGN KEY ("idRol") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioCampana" ADD CONSTRAINT "UsuarioCampana_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioCampana" ADD CONSTRAINT "UsuarioCampana_idCampana_fkey" FOREIGN KEY ("idCampana") REFERENCES "Campana"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
