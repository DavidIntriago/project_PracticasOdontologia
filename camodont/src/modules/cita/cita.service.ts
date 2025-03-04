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
        where: { external_id: idCampana },
      });
    
      if (!campana) {
        throw new Error('Campaña no encontrada');
      }

      const servicio = await prisma.servicio.findUnique({
        where: { external_id: idServicio },
      });

      if (!servicio) {
        throw new Error('Servicio no encontrado');
      }
    
      const student = await prisma.usuarioCampana.findFirst({
        where: {
          Campana: {external_id: idCampana},
          Usuario: {external_id: dentistaId},
        },
      });
    
      if (!student) {
        throw new Error('El estudiante no está registrado en esta campaña.');
      }
      

      const paciente = await prisma.usuario.findUnique({
        where: { external_id: pacienteId },
      });

      return prisma.cita.create({
        data: {
          ...dataCita,
          fecha: new Date(fecha),
          campana: {
            connect: {
              id: campana.id,
            },
          },
          servicio: {
            connect: {
              id: servicio.id,
            },
          },
          dentista: {
            connect: {
              id: student.idUsuario,
            },
          },
          paciente: {
            connect: {
              id: paciente.id,
            },
          },
          estado: "PENDIENTE",
        },
        
      });
    }

    );
  }

  findAll() {
    return this.prisma.cita.findMany(
      {
        include: {
          campana: true,
          servicio: true,
          dentista: true,
          paciente: true,
        },
      }
    );

  }

  findForPatient(external_id: string) {
    return this.prisma.$transaction(async (prisma) => {
      const paciente = await prisma.usuario.findUnique({
        where: { external_id },
      });
  
      if (!paciente) {
        throw new Error('Paciente no encontrado');
      }
  
      return prisma.cita.findMany({
        where: {
          pacienteId: paciente.id,
        },
        include: {
          campana: true,
          servicio: true,
          dentista: true,
          paciente: true,
        },
      });
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
