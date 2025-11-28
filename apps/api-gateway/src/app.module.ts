import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH-SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8877,
        },
      },
      {
        name: 'USER-SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8878,
        },
      },
    ]),
  ],
  controllers: [AuthController, UserController],
})
export class AppModule {}
