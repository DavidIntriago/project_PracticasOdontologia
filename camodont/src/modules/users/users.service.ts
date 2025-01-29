import { Injectable, Req } from '@nestjs/common';
import {CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}

  create( createUserDto: CreateUserDto) {
    return this.prisma.usuario.create({
      data: createUserDto,
      include: {
        rol: true
      }
    });
  }

  findAll() {
    return this.prisma.usuario.findMany() ;
  }

  findOne(id: number) {
    return this.prisma.usuario.findUnique({
      where: {id: id}
      });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.usuario.update({
      where: {id: id},
      data: updateUserDto
      });
  }

  remove(id: number) {
    return this.prisma.usuario.delete({
      where: {id: id}
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
