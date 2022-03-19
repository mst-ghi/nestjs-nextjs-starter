import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard, ReqUser, ApiSignature } from '@app/decorators';

import { RefreshDto, LoginDto, ChangePasswordDto, RegisterDto } from './dto';
import { AuthService } from './services/auth.service';
import { InitResponse, LoginResponse, RefreshResponse } from './responses';
import { Body, Controller, Req, UseGuards } from '@nestjs/common';

import {
  FacebookAuthGuard,
  GoogleAuthGuard,
  LocalAuthGuard,
} from '@app/guards';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiSignature({
    method: 'POST',
    path: '/login',
    summary: 'login api',
  })
  @ApiResponse({ status: 200, type: LoginResponse })
  @UseGuards(LocalAuthGuard)
  async login(@Body() _: LoginDto, @Req() req: any) {
    return await this.service.user(req.user).login();
  }

  @ApiSignature({
    method: 'POST',
    path: '/register',
    summary: 'register api',
  })
  async register(@Body() dto: RegisterDto) {
    return await this.service.register(dto);
  }

  @ApiSignature({
    method: 'POST',
    path: '/refresh-token',
    summary: 'refresh token api',
  })
  @ApiResponse({ status: 200, type: RefreshResponse })
  async refresh(@Body() dto: RefreshDto) {
    return await this.service.refreshToken(dto);
  }

  @ApiSignature({
    method: 'GET',
    path: '/init',
    summary: 'get logged in user info and init data',
  })
  @ApiResponse({ status: 200, type: InitResponse })
  @JwtGuard()
  async init(@ReqUser() user: any) {
    return await this.service.init(user);
  }

  @ApiSignature({
    method: 'POST',
    path: '/change-password',
    summary: 'change user password api',
  })
  @JwtGuard()
  async changePassword(@Body() dto: ChangePasswordDto) {
    return await this.service.changePassword(
      dto.current_password,
      dto.new_password,
    );
  }

  @UseGuards(GoogleAuthGuard)
  @ApiSignature({
    method: 'GET',
    path: '/google',
    summary: 'redirect to google authenticate',
  })
  async googleAuth(@Req() _: any) {
    //
  }

  @UseGuards(GoogleAuthGuard)
  @ApiSignature({
    method: 'GET',
    path: '/google/redirect',
    summary: 'google callback api for continues authenticate',
  })
  async googleCallBack(@Req() req: any) {
    if (req.user && req.user.email) {
      return await this.service.socialite(req.user);
    }
  }

  @UseGuards(FacebookAuthGuard)
  @ApiSignature({
    method: 'GET',
    path: '/facebook',
    summary: 'redirect to facebook authenticate',
  })
  async facebookAuth(@Req() _: any) {
    //
  }

  @UseGuards(FacebookAuthGuard)
  @ApiSignature({
    method: 'GET',
    path: '/facebook/redirect',
    summary: 'facebook callback api for continues authenticate',
  })
  async facebookCallBack(@Req() req: any) {
    if (req.user && req.user.email) {
      return await this.service.socialite(req.user);
    }
  }
}
