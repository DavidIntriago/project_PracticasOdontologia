import { Injectable } from '@nestjs/common';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class PeriodService {

  constructor(private prisma: PrismaService) {}
  

  create(createPeriodDto: CreatePeriodDto) {
    return this.prisma.periodoAcademico.create({
      data: {
        fechaInicio: new Date(createPeriodDto.fechaInicio),
        fechaFin: new Date(createPeriodDto.fechaFin),
      },
    });
  }

  findAll() {
    return this.prisma.periodoAcademico.findMany()
  }

  findOne(id: number) {
    return this.prisma.periodoAcademico.findUnique({
      where: {id}
    })
  }

  update(id: number, updatePeriodDto: UpdatePeriodDto) {
    return this.prisma.periodoAcademico.update({
      where: {id},
      data: updatePeriodDto
    })
  }

  remove(id: number) {
    return this.prisma.periodoAcademico.delete({
      where: {id}
    })
  }
}
