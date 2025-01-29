import { PartialType } from '@nestjs/mapped-types';
import { CreatePeriodDto } from './create-period.dto';

export type UpdatePeriodDto = Partial<CreatePeriodDto>