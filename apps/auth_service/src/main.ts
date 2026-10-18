import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth_service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8877,
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
  Logger.log('Auth Service is running TCP port 8877');
}
bootstrap();
