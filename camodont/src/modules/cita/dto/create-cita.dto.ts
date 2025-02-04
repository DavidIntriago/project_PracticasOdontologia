import { Cita} from "@prisma/client";

export type CreateCitaDto = Omit<Cita, 'id' | 'createdAt' | 'updatedAt' | 'external_id' >;



