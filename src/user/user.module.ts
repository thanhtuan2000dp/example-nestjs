// ** NestJS Imports
import { Module } from '@nestjs/common';

// ** Controllers Imports
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
