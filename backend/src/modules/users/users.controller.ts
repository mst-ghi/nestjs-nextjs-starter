import { ApiSignature } from '@app/decorators';
import { Controller, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { PeoplesListResponse, UserProfileResponse } from './responses';
import { RoleKeysEnum } from '@app/enums';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @ApiResponse({ status: 200, type: UserProfileResponse })
  @ApiSignature({
    method: 'GET',
    path: '/:username/details',
    summary: 'get user profile by username',
  })
  async getProfile(
    @Param('username') username: string,
  ): Promise<UserProfileResponse> {
    return {
      user: await this.service.getProfileByUsername(username),
    };
  }

  @ApiResponse({ status: 200, type: PeoplesListResponse })
  @ApiQuery({ name: 'role', description: 'filter by role', enum: RoleKeysEnum })
  @ApiSignature({
    method: 'GET',
    path: '/peoples',
    summary: 'get peoples list',
    isPagination: true,
  })
  async peoples(
    @Query('take') take = 20,
    @Query('cursor') cursor: number = undefined,
    @Query('role') role: string = undefined,
  ): Promise<PeoplesListResponse> {
    return {
      peoples: await this.service.getPeoples(take, cursor, role),
    };
  }
}
