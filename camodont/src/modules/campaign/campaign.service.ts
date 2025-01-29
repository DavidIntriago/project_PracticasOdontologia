import { Injectable } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CampaignService {

constructor (private prisma: PrismaService) {}

async create(createCampaignDto: CreateCampaignDto) {
  const { serviciosIds, idPeriodoAcademico, ...campaignData } = createCampaignDto;

  return this.prisma.campana.create({
    data: {
      ...campaignData,
      PeriodoAcademico: {
        connect: { id: idPeriodoAcademico },
      },
      // Relaciona los servicios usando connect
      Servicio: {
        connect: serviciosIds.map((id) => ({ id })),
      },
    },
    include: {
      Servicio: true, // Incluye los servicios relacionados en la respuesta
      PeriodoAcademico: true, // Incluye el periodo académico relacionado
    },
  });
}

  findAll() {
    return this.prisma.campana.findMany({
      include: {
        Servicio: true, // Incluye los servicios relacionados en la respuesta
        PeriodoAcademico: true, // Incluye el periodo académico relacionado
      },
    }
    );
    
  }

  findOne(id: number) {
    return this.prisma.campana.findUnique({
      where: { id },
      include: {
        Servicio: true, // Incluye los servicios relacionados en la respuesta
        PeriodoAcademico: true, // Incluye el periodo académico relacionado
      },
    });
  }

  async update(id: number, updateCampaignDto: UpdateCampaignDto) {
    const { serviciosIds, idPeriodoAcademico, ...campaignData } = updateCampaignDto;
  
    return this.prisma.campana.update({
      where: { id },
      data: {
        ...campaignData, // Actualiza campos básicos
        // Manejo de PeriodoAcademico
        PeriodoAcademico: idPeriodoAcademico
          ? { connect: { id: idPeriodoAcademico } }
          : undefined,
        // Manejo de Servicio
        Servicio: serviciosIds
          ? { set: serviciosIds.map((id) => ({ id })) } // Reemplaza relaciones
          : undefined,
      },
      include: {
        Servicio: true, // Incluye datos de Servicio en la respuesta
        PeriodoAcademico: true, // Incluye datos de PeriodoAcademico
      },
    });
  }
  



  remove(id: number) {
    return this.prisma.campana.delete({
      where: { id },
    });
  }
}




