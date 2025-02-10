import { CreateUserDto } from './create-user.dto';

export type UpdateUserDto = Partial<CreateUserDto> & Omit<CreateUserDto, 'correo'| 'clave'>;
