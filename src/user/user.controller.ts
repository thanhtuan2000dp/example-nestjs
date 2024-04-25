// ** NestJS Imports
import { Controller, Get, UseGuards } from '@nestjs/common';

// ** Prisma Import
import { User } from '@prisma/client';

// ** Thirdparty Imports
import { GetUser } from 'src/auth/decorator';

// ** Guards Import
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User, @GetUser('email') email: string) {
    console.log(user);
    console.log(email);
    return user;
  }
}
