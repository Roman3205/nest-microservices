import { Injectable } from '@nestjs/common';

@Injectable()
export class UserServiceService {
  private users = [
    {
      id: '1',
      name: 'John Doe',
    },
  ];

  getUser(userId: string) {
    return this.users.find((user) => user.id === userId) || null;
  }
}
