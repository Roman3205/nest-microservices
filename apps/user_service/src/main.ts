import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user_service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8878,
      },
    },
  );
  await app.listen(process.env.PORT ?? 3003);
  Logger.log('User Service is running TCP port 8878');
}
bootstrap();
