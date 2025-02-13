import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login';
import { PrismaService } from 'src/db/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

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
    const salt = parseInt(process.env.CODE_BCRYPT_SALT || '10');
    const isMatch = await bcrypt.compare(login.clave, usuario.clave);
    console.log(isMatch);

    if (!usuario) {
      return { error: 'Usuario no encontrado' };
    }
    if (!isMatch) {
      return { error: 'Clave incorrecta' };
    }else{
    return usuario;

  }
  }
}
