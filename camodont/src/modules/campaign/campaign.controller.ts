import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  create(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignService.create(createCampaignDto);
  }

  @Post("/registry/:external_id")
  registerUserInCampaign(@Param('external_id') id: string, @Body("idUsuario") idUsuario: number) {
    return this.campaignService.registerUserInCampaign(id, idUsuario);
    }

  @Get()
  findAll() {
    return this.campaignService.findAll();
  }

  @Get(':external_id/services')
  findOne_Services(@Param('external_id') id: string) {
    return this.campaignService.findOne_Services(id);
  }

  @Get(':external_id')
  findOne(@Param('external_id') id: string) {
    return this.campaignService.findOne(id);
  }

  @Patch(':external_id')
  update(@Param('external_id') id: string, @Body() updateCampaignDto: UpdateCampaignDto) {
    return this.campaignService.update(id, updateCampaignDto);
  }

  @Delete(':external_id')
  remove(@Param('external_id') id: string) {
    return this.campaignService.remove(id);
  }

}
