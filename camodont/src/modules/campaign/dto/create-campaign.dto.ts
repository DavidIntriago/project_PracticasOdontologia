import { Campana, UsuarioCampana,  } from "@prisma/client";


export type CreateCampaignDto = Omit<Campana, 'id' | 'createdAt' | 'updatedAt'> & { serviciosId: number[] };
