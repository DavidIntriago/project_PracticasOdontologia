import { Module } from '@nestjs/common';
import { CampaignModule } from './modules/campaign/campaign.module';
import { CitaModule } from './modules/cita/cita.module';
import { PeriodModule } from './modules/period/period.module';
import { ServicesModule } from './modules/services/services.module';
import { TreatmentModule } from './modules/treatment/treatment.module';
import { UsersModule } from './modules/users/users.module';


@Module({


  imports: [CampaignModule, CitaModule, PeriodModule, ServicesModule, TreatmentModule, UsersModule]
})
export class AppModule {}
