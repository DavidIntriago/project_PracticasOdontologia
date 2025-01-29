import {PeriodoAcademico} from '@prisma/client'

export type CreatePeriodDto = Omit<PeriodoAcademico, 'id' | 'createdAt' | 'updatedAt'>

