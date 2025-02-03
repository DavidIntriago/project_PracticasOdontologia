import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { PrismaService } from "../../db/prisma/prisma.service";

@Module({
  controllers: [CampaignController],
  providers: [CampaignService, {provide: PrismaService,
    useFactory: () => PrismaService.getInstance()
  }],
})
export class CampaignModule {}
