import {Servicio} from '@prisma/client'

export type CreateServiceDto = Omit<Servicio, 'id' | "external_id" | 'createdAt' | 'updatedAt' >;