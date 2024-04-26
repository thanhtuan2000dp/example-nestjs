// ** NestJS Import
import { Injectable } from '@nestjs/common';

// ** Prisma Import
import { PrismaService } from 'src/prisma/prisma.service';

// ** DTOs Import
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: dto,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hash, ...userWithoutHash } = user;

    return userWithoutHash;
  }
}
