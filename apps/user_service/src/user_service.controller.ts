import { Controller } from '@nestjs/common';
import { UserServiceService } from './user_service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @MessagePattern('get-user')
  getUser(@Payload() userId: string) {
    return this.userServiceService.getUser(userId);
  }
}
