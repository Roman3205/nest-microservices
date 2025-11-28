import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH-SERVICE') private readonly authClient: ClientProxy,
  ) {}
  @Post('login')
  async login(
    @Body() data: { username: string; password: string },
  ): Promise<string> {
    return firstValueFrom(this.authClient.send('auth-login', data));
  }
}
