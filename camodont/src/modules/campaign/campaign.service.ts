import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CampaignService {

constructor (private prisma: PrismaService) {}

create(createCampaignDto: CreateCampaignDto) {

  console.log(createCampaignDto);
  const { serviciosId, idPeriodoAcademico, ...dataCampaign } = createCampaignDto; 
  return this.prisma.campana.create({
    data: {
      ...dataCampaign,
      fechaInicio: new Date(dataCampaign.fechaInicio),
      fechaFin: new Date(dataCampaign.fechaFin),
      
      PeriodoAcademico: {
        connect: {
          id: idPeriodoAcademico,
        },

      },
      
      Servicio: {
        connect: serviciosId.map((id) => ({
          id,
        })),
      },
    },
    include: {
      Servicio: true, 
      PeriodoAcademico: true,
    },
  });
}

update(external_id: string, updateCampaignDto: UpdateCampaignDto) {
  const { serviciosId, idPeriodoAcademico, ...dataCampaign } = updateCampaignDto;
  return this.prisma.campana.update({
    where: { external_id },
    data: {
      ...dataCampaign,
      fechaInicio: new Date(dataCampaign.fechaInicio),
      fechaFin: new Date(dataCampaign.fechaFin),
      PeriodoAcademico: {
        connect: {
          id: idPeriodoAcademico,
        },
      },
      Servicio: {
        set: serviciosId.map((id) => ({
          id,
        })),
      },
    },
    include: {
      Servicio: true, 
      PeriodoAcademico: true,
    },
  });
}


  findAll() {
    return this.prisma.campana.findMany({
      include: {
        Servicio: true, 
        PeriodoAcademico: true, 
      },
    }
    );
    
  }


  findOne(external_id: string) {
    return this.prisma.campana.findUnique({
      where: { external_id: external_id },
      include: {
        Servicio: true, 
        PeriodoAcademico: true, 
      },
    });
  }

  
  



  remove(external_id: string) {
    return this.prisma.campana.delete({
      where: { external_id },
    });
  }


  async registerUserInCampaign(external_id: string, idUsuario: number) {
    console.log(external_id, idUsuario);
    const userExists = await this.prisma.usuario.findUnique({
      where: { id: idUsuario },
      
    });

  
    if (!userExists) {
      throw new BadRequestException('El usuario no existe.');
    }
  
    const campaignExists = await this.prisma.campana.findUnique({
      where: { external_id: external_id },
    });
  
    if (!campaignExists) {
      throw new BadRequestException('La campaña no existe.');
    }
  
    return this.prisma.usuarioCampana.create({
      data: {
        Usuario: {
          connect: { id: idUsuario },
        },
        Campana: {
          connect: { external_id: external_id },
        },
      },
      include: {
        Usuario: true,
        Campana: true,
      },
    });
  }
  

}






