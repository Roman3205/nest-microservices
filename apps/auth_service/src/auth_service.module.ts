import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth_service.controller';
import { AuthServiceService } from './auth_service.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/auth_service/.env',
    }),
  ],
  controllers: [AuthServiceController],
  providers: [AuthServiceService],
})
export class AuthServiceModule {}
