import { ApiSignature } from '@app/decorators';
import { Controller, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import {
  MembersListResponse,
  MentorsListResponse,
  UserProfileResponse,
} from './responses';

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

  @ApiResponse({ status: 200, type: MembersListResponse })
  @ApiSignature({
    method: 'GET',
    path: '/members',
    summary: 'get members list',
    isPagination: true,
  })
  async members(
    @Query('take') take = 20,
    @Query('cursor') cursor: number = undefined,
  ): Promise<MembersListResponse> {
    return {
      members: await this.service.getMembers(take, cursor),
    };
  }

  @ApiResponse({ status: 200, type: MentorsListResponse })
  @ApiSignature({
    method: 'GET',
    path: '/mentors',
    summary: 'get mentors list',
    isPagination: true,
  })
  async mentors(
    @Query('take') take = 20,
    @Query('cursor') cursor: number = undefined,
  ): Promise<MentorsListResponse> {
    return {
      mentors: await this.service.getMentors(take, cursor),
    };
  }
}
