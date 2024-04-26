// ** NestJS Imports
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';

// ** Prisma Import
import { User } from '@prisma/client';

// ** Thirdparty Imports
import { GetUser } from 'src/auth/decorator';

// ** Guards Import
import { JwtGuard } from 'src/auth/guard';

// ** DTOs Import
import { EditUserDto } from './dto';

// ** Services Import
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch('edit')
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
