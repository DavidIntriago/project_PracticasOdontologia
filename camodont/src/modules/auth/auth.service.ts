import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class AuthService {
constructor (private prisma: PrismaService) {}
  

  async login(login: LoginDto) {
    const usuario = await this.prisma.usuario.findFirst({
      where: {
        correo: login.correo, 
      },
    });
    console.log(usuario);
    if (!usuario) {
      return { error: 'Usuario no encontrado' };
    }
    if (usuario.clave != login.clave) {
      return { error: 'Clave incorrecta' };
    }else{
    return usuario;

  }
  }
}
