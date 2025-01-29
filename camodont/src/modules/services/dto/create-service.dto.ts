import {Servicio} from '@prisma/client'

export type CreateServiceDto = Omit<Servicio, 'id' | 'createdAt' | 'updatedAt'>