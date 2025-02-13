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
      const token_data = {
        external_id: usuario.external_id,
        idRol: usuario.idRol,
        check: true,
      };
      console.log(token_data);
      require('dotenv').config();
      const key = process.env.KEY_JWT;
      console.log(key);
      const jwt = require('jsonwebtoken').sign(token_data, key,
      {expiresIn: '1h'});
      console.log(jwt);
     
      
      return { token: jwt,
        idRol: usuario.idRol,
        external_id: usuario.external_id,
        
      };


  }
  }
}
