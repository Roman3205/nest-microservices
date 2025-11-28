import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthServiceService {
  constructor(private readonly jwtService: JwtService) {}
  login(credentials: { username: string; password: string }) {
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      const payload = {
        sub: '123',
        username: credentials.username,
        role: 'admin',
      };
      const token = this.jwtService.sign(payload);
      return token;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async validateToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return { userId: decoded.sub, role: decoded.role };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
