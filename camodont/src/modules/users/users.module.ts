import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, {provide: PrismaService,
    useFactory: () => PrismaService.getInstance()
  }],
})
export class UsersModule {}
