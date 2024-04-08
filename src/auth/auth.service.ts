// ** NestJS Imports
import { ForbiddenException, Injectable } from '@nestjs/common';

// ** Third party Imports
import * as argon from 'argon2';

// ** File Imports
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
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
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });
      //Return the saved user
      return user;
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
    delete (user as { hash?: string }).hash;
    return user;
  }
}
