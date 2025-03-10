import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './db/prisma/prisma.service';

async function bootstrap() {

  
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Permite cualquier origen
  });
  
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 4000);


}
bootstrap();
