import { Module } from '@nestjs/common';
import { CampaignModule } from './modules/campaign/campaign.module';
import { CitaModule } from './modules/cita/cita.module';
import { PeriodModule } from './modules/period/period.module';
import { ServicesModule } from './modules/services/services.module';
import { TreatmentModule } from './modules/treatment/treatment.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaService } from './db/prisma/prisma.service';
import { RolService } from './modules/rol/rol.service';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';


@Module({


  imports: [CampaignModule, CitaModule, PeriodModule, ServicesModule, TreatmentModule, UsersModule, AuthModule],


  providers: [PrismaService, RolService, AuthService]
})
export class AppModule {
  constructor (private rolService: RolService) {
    this.rolService.revisionRol();
    }
}
