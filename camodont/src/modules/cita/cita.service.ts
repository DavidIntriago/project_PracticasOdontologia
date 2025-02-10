import { Injectable } from '@nestjs/common';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class CitaService {

  constructor(private prisma: PrismaService) {}
  

  create(createCitaDto: CreateCitaDto) {
    return this.prisma.cita.create({
      data: createCitaDto,
      /*include: {
        Usuario: true,
        Servicio: true,

      }
        */
    });
  }

  findAll() {
    return this.prisma.cita.findMany(
      {
        /*include: {
          Usuario: true,
          Servicio: true,
        }*/
      }
    );

  }

  findOne(id: number) {
    return `This action returns a #${id} cita`;
  }

  update(id: number, updateCitaDto: UpdateCitaDto) {
    return `This action updates a #${id} cita`;
  }

  remove(id: number) {
    return `This action removes a #${id} cita`;
  }
}
