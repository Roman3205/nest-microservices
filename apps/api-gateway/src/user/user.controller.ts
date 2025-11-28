import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth/auth.guard';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import type { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(
    @Inject('USER-SERVICE') private readonly userClient: ClientProxy,
  ) {}
  @UseGuards(AuthGuard)
  @Get()
  async getUser(@Req() req: Request): Promise<{ id: string; name: string }> {
    const userId = req.user?.userId;
    return firstValueFrom(this.userClient.send('get-user', userId));
  }
}
