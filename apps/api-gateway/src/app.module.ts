import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user/user.controller';
import { readFileSync } from 'fs';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH-SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 8877,
          tlsOptions: {
            key: readFileSync(join(__dirname, 'certs', 'client.key')),
            cert: readFileSync(join(__dirname, 'certs', 'client.crt')),
            ca: readFileSync(join(__dirname, 'certs', 'ca.crt')),
            requestCert: true,
            rejectUnauthorized: true,
          },
        },
      },
      {
        name: 'USER-SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 8878,
          tlsOptions: {
            key: readFileSync(join(__dirname, 'certs', 'client.key')),
            cert: readFileSync(join(__dirname, 'certs', 'client.crt')),
            ca: readFileSync(join(__dirname, 'certs', 'ca.crt')),
            requestCert: true,
            rejectUnauthorized: true,
          },
        },
      },
    ]),
  ],
  controllers: [AuthController, UserController],
})
export class AppModule {}
