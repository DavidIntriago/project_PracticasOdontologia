import { Injectable, Req } from '@nestjs/common';
import {CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { env } from 'process';
@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}

  async create( createUserDto: CreateUserDto) {
    if(createUserDto.correo.includes('@unl.edu.ec')){
      createUserDto.idRol = 3;
    }else{
      createUserDto.idRol = 2;
    }
    const salt = parseInt(process.env.CODE_BCRYPT_SALT || '10');
    createUserDto.clave = await bcrypt.hash(createUserDto.clave, salt);
    return this.prisma.usuario.create({
      data: createUserDto,
      include: {
        rol: true,
      }
      
    });
  }

  findAllStudents() {
    return this.prisma.usuario.findMany({
      where: {
        idRol: 3
      },
      include: {
        rol: true,
      }
    });
  }
  findAllUsers() {
    return this.prisma.usuario.findMany({
      where: {
        idRol: 2
      },
      include: {
        rol: true,
      }
    });
  }

  findOne(external_id: string) {
    return this.prisma.usuario.findUnique({
      where: {external_id: external_id},
      include: {
        rol: true,
      }
      });
  }

  update(external_id: string, updateUserDto: UpdateUserDto) {
    
    try {
      const data = this.prisma.usuario.update({
        where: {external_id: external_id},
        data: updateUserDto,
        include: {
          rol: true,
        }
      });
      return{
        success: true,
        data: data
      }
      
    } catch (error) {
      return{
        success: false,
        error: error
      }

      
    }

  }

  updatePassword(external_id: string, clave: string) {
    const salt = parseInt(process.env.CODE_BCRYPT_SALT || '10');
    clave = bcrypt.hashSync(clave, salt);
    return this.prisma.usuario.update({
      where: {external_id: external_id},
      data: {clave: clave}
      });
  }

  remove(external_id: string) {
    return this.prisma.usuario.delete({
      where: {external_id: external_id}
      });
  }

  asignarCamapana(idUsuario: number, idCampana: number) {
    return this.prisma.usuarioCampana.create
    ({
      data: {
        
        Usuario: {
          connect: { id: idUsuario }
        },
        Campana: {
          connect: { id: idCampana }
        }
      },
      include: {
        Usuario: true,
        Campana: true
      }
    });
  }
}
