import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class RolService {
  constructor(private prisma: PrismaService) {}

  async revisionRol() {
    const rolesPermitidos = ['admin', 'paciente', 'estudiante'];
    
    for (const rol of rolesPermitidos) {
      const rolExistente = await this.prisma.rol.findMany({
        where: { nombre: rol },
      });
      
      // Si no existe le rol, lo creo 
      if (rolExistente.length === 0) {
        await this.prisma.rol.create({
          data: { nombre: rol },
        });
        console.log(`Rol creado: ${rol}`);
      } else {
        console.log(`Rol ya existe: ${rol}`);
      }
    }
  }
}
