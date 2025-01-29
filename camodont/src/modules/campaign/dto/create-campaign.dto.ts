import { Campana } from "@prisma/client";

export type CreateCampaignDto = Omit<Campana, 'id' | 'createdAt' | 'updatedAt' | 'PeriodoAcademico' | 'Servicio'> & {
  idPeriodoAcademico: number; // Clave foránea para relacionar PeriodoAcademico
  serviciosIds: number[]; // Lista de IDs de servicios relacionados
};
