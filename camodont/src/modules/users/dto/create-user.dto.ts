import { Usuario} from "@prisma/client";

export type CreateUserDto = Omit<Usuario, 'id' | 'createdAt' | 'updatedAt'>;




