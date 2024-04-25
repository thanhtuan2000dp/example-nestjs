// ** NestJS Imports
import { Module } from '@nestjs/common';

// ** Controllers Imports
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
})
export class UserModule {}
