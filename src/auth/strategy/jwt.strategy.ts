// ** NestJS Imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

// ** Thirdparty Imports
import { ExtractJwt, Strategy } from 'passport-jwt';

// ** Prisma Imports
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: number; email: string }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hash, ...userWithoutHash } = user;
      return userWithoutHash;
    }
  }
}
