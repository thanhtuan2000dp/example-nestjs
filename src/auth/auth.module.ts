// ** NestJS Imports
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// ** File Imports
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
