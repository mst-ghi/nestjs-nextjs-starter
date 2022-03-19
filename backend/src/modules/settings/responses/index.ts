import { SettingEntity } from '@app/prisma/entities';
import { ApiProperty } from '@nestjs/swagger';

export class SettingsListResponse {
  @ApiProperty({ type: [SettingEntity] })
  settings: SettingEntity[];
}

export class SettingResponse {
  @ApiProperty({ type: SettingEntity })
  setting: SettingEntity;
}
