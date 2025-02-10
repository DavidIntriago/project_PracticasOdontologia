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

  findOne(external_id: string) {
    return this.prisma.servicio.findUniqueOrThrow({
      where: {external_id: external_id}
    })
  }

  update(external_id: string, updateServiceDto: UpdateServiceDto) {
    return this.prisma.servicio.update({
      where: {external_id: external_id},
      data: updateServiceDto
    })

  }

  remove(external_id: string) {
    return this.prisma.servicio.delete({
      where: {external_id: external_id}
    })
  }
}
