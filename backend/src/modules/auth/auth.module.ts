import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { JwtService } from './services/jwt.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import {
  FacebookStrategy,
  GoogleStrategy,
  JwtStrategy,
  LocalStrategy,
} from './strategies';

@Module({
  imports: [PassportModule, ConfigModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    LocalStrategy,
    JwtStrategy,
    FacebookStrategy,
    GoogleStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
