import { SettingsService } from './settings.service';
import { ApiSignature, JwtGuard } from '@app/decorators';
import { Body, Controller, Param } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SettingCreateDto, SettingUpdateDto } from './dto';
import { SettingResponse, SettingsListResponse } from './responses';

@ApiTags('settings')
@Controller('settings')
@JwtGuard()
export class SettingsController {
  constructor(private readonly service: SettingsService) {}

  @ApiResponse({ status: 200, type: SettingsListResponse })
  @ApiSignature({
    method: 'GET',
    summary: 'get settings list',
  })
  async list(): Promise<SettingsListResponse> {
    return {
      settings: await this.service.list(),
    };
  }

  @ApiResponse({ status: 201, type: SettingResponse })
  @ApiSignature({
    method: 'POST',
    summary: 'create new setting',
    status: 201,
  })
  async create(@Body() dto: SettingCreateDto): Promise<SettingResponse> {
    return {
      setting: await this.service.create(dto),
    };
  }

  @ApiResponse({ status: 200, type: SettingResponse })
  @ApiSignature({
    method: 'GET',
    path: '/:id',
    summary: 'get setting details by id',
  })
  async details(@Param('id') id: number): Promise<SettingResponse> {
    return {
      setting: await this.service.findByIdOrThrowException(id),
    };
  }

  @ApiResponse({ status: 200, type: SettingResponse })
  @ApiParam({ name: 'id', description: 'setting id' })
  @ApiSignature({
    method: 'PUT',
    path: '/:id',
    summary: 'update exist setting by id',
  })
  async update(
    @Body() dto: SettingUpdateDto,
    @Param('id') id: number,
  ): Promise<SettingResponse> {
    return {
      setting: await this.service.update(dto, id),
    };
  }
}
