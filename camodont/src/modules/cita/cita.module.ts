import { Module } from '@nestjs/common';
import { CitaService } from './cita.service';
import { CitaController } from './cita.controller';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Module({
  controllers: [CitaController],
  providers: [CitaService, {provide: PrismaService,
      useFactory: () => PrismaService.getInstance()
    }],
})
export class CitaModule {}
