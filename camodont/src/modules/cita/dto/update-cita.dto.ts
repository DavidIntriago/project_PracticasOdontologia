import { PartialType } from '@nestjs/mapped-types';
import  {CreateCitaDto}  from './create-cita.dto';

export type UpdateCitaDto = Partial<CreateCitaDto>;;
