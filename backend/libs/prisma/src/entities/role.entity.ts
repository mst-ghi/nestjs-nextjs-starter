import { ApiProperty } from '@nestjs/swagger';

export class RoleEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  key: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  department: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  updated_at?: Date;

  constructor(partial: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }
}
