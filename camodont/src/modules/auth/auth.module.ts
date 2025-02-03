import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, {provide: PrismaService,
      useFactory: () => PrismaService.getInstance()
    } ],
})
export class AuthModule {}
