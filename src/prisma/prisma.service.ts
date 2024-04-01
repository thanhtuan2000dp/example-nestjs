import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://davidtuan:123456@localhost:5434/nestdb?schema=public',
        },
      },
    });
  }
}
