import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { Prisma, Servicio } from '@prisma/client';

@Injectable()
export class ServicesService {

  constructor(private prisma: PrismaService) {}


  async create(createServiceDto: CreateServiceDto) {
    return this.prisma.servicio.create({
      data: createServiceDto
    })
    
  }

  findAll(
  ) {
    return this.prisma.servicio.findMany()
  }

  findOne(id: number) {
    return this.prisma.servicio.findUniqueOrThrow({
      where: {id}
    })
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return this.prisma.servicio.update({
      where: {id},
      data: updateServiceDto
    })

  }

  remove(id: number) {
    return this.prisma.servicio.delete({
      where: {id}
    })
  }
}
