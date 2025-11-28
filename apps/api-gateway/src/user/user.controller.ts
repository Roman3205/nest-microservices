import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth/auth.guard';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(
    @Inject('USER-SERVICE') private readonly userClient: ClientProxy,
  ) {}
  @UseGuards(AuthGuard)
  @Get()
  async getUser(@Req() req) {
    const userId = req.user.userId;
    const user = this.userClient.send('get-user', userId);
    return firstValueFrom(user);
  }
}
