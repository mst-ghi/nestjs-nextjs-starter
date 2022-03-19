import { Controller, Get, HttpCode } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

class AppResponse {
  @ApiProperty()
  app_version: string;

  @ApiProperty()
  mode: string;
}

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'home api' })
  @ApiResponse({ status: 200, type: AppResponse })
  home(): AppResponse {
    return {
      app_version: this.configService.get<string>('version'),
      mode: this.configService.get<string>('mode'),
    };
  }
}
