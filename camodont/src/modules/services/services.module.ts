import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, {provide: PrismaService,
    useFactory: () => PrismaService.getInstance()
  }],
})
export class ServicesModule {}
