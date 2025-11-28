import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthServiceService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}
  login(credentials: { username: string; password: string }) {
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      const payload = {
        sub: '1',
        username: credentials.username,
        role: 'admin',
      };

      const token = this.jwtService.sign(payload, {
        secret: this.config.get('SECRET_JWT'),
        expiresIn: '1h',
      });
      return token;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  validateToken(token: string) {
    const decoded = this.jwtService.verify<{ sub: string; role: string }>(
      token,
      { secret: this.config.get('SECRET_JWT') },
    );
    if (!decoded) {
      throw new UnauthorizedException();
    }
    return { userId: decoded.sub, role: decoded.role };
  }
}
