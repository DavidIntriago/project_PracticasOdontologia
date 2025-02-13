import { Injectable } from '@nestjs/common';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class CitaService {

  constructor(private prisma: PrismaService) {}
  

  async create(createCitaDto: CreateCitaDto) {
    const {idCampana, idServicio, dentistaId, pacienteId,fecha, ...dataCita }= createCitaDto;
    
    return this.prisma.$transaction(async (prisma) => {
      
      const campana = await prisma.campana.findUnique({
        where: { id: idCampana },
      });
    
      if (!campana) {
        throw new Error('Campaña no encontrada');
      }
    
      const paciente = await prisma.usuarioCampana.findFirst({
        where: {
          Campana: {id: idCampana},
          Usuario: {id: pacienteId},
        },
      });
  
      
    
      if (!paciente) {
        throw new Error('El paciente no está registrado en esta campaña.');
      }
      
      return prisma.cita.create({
        data: {
          ...dataCita,
          fecha: new Date(fecha),
          campana: {
            connect: {
              id: idCampana,
            },
          },
          servicio: {
            connect: {
              id: idServicio,
            },
          },
          dentista: {
            connect: {
              id: dentistaId,
            },
          },
          paciente: {
            connect: {
              id: pacienteId,
            },
          },
        },
        
      });
    }

    );
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
