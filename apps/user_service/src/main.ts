import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user_service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8878,
        tlsOptions: {
          key: readFileSync(join(__dirname, 'certs', 'server.key')),
          cert: readFileSync(join(__dirname, 'certs', 'server.crt')),
          ca: readFileSync(join(__dirname, 'certs', 'ca.crt')),
          requestCert: true,
          rejectUnauthorized: true,
        },
      },
    },
  );
  await app.listen();
  Logger.log('User Service is running TCP port 8878');
}

bootstrap();
