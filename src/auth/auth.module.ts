// ** NestJS Imports
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// ** File Imports
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [JwtModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
