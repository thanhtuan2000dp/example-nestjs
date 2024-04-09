// ** NestJS Imports
import { ForbiddenException, Injectable } from '@nestjs/common';

// ** Third party Imports
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

// ** File Imports
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    //Generate the hash password
    const hash = await argon.hash(dto.password);

    //Save the new user to the Database
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      //Return the saved user
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    // If the user doesn't exist throw exception
    if (!user) {
      throw new ForbiddenException('Credentials incorrect!');
    }

    // Compare password
    const passwordMatches = await argon.verify(user.hash, dto.password);
    // If the password incorrect throw exception
    if (!passwordMatches) {
      throw new ForbiddenException('Credentials incorrect!');
    }
    // Send the user info
    return this.signToken(user.id, user.email);
  }

  signToken(userId: number, email: string): Promise<string> {
    const payload = { sub: userId, email: email };

    const secret = this.config.get('SECRET_KEY');

    return this.jwt.signAsync(payload, { expiresIn: '15m', secret: secret });
  }
}
