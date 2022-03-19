import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller } from '@nestjs/common';
import { ApiSignature, JwtGuard, ReqUser } from '@app/decorators';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto';
import { UserEntity } from '@app/prisma/entities';
import { UpdateProfileResponse } from './responses';

@ApiTags('profile')
@Controller('profile')
@JwtGuard()
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @ApiResponse({ status: 200, type: UpdateProfileResponse })
  @ApiSignature({
    method: 'PUT',
    summary: 'create or update user profile',
  })
  async updateProfile(
    @Body() dto: UpdateProfileDto,
    @ReqUser() user: UserEntity,
  ): Promise<UpdateProfileResponse> {
    return {
      profile: await this.service.user(user).updateProfile(dto),
    };
  }
}
