import { ApiSignature, JwtGuard, ReqUser } from '@app/decorators';
import { UserEntity } from '@app/prisma/entities';
import { Body, Controller, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSocialDto, UpdateSocialDto } from './dto';
import { SocialResponse, SocialsListResponse } from './responses';
import { SocialsService } from './socials.service';

@ApiTags('socials')
@Controller('socials')
@JwtGuard()
export class SocialsController {
  constructor(private readonly service: SocialsService) {}

  @ApiResponse({ status: 200, type: SocialsListResponse })
  @ApiSignature({
    method: 'GET',
    summary: 'get socials list',
  })
  async list(@ReqUser() user: UserEntity): Promise<SocialsListResponse> {
    return {
      socials: await this.service.user(user).list(),
    };
  }

  @ApiResponse({ status: 200, type: SocialResponse })
  @ApiSignature({
    method: 'POST',
    summary: 'create new social',
  })
  async create(
    @Body() dto: CreateSocialDto,
    @ReqUser() user: UserEntity,
  ): Promise<SocialResponse> {
    return {
      social: await this.service.user(user).create(dto),
    };
  }

  @ApiResponse({ status: 200, type: SocialResponse })
  @ApiSignature({
    method: 'PUT',
    path: '/:id',
    summary: 'update exist social',
  })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateSocialDto,
    @ReqUser() user: UserEntity,
  ): Promise<SocialResponse> {
    return {
      social: await this.service.user(user).update(id, dto),
    };
  }

  @ApiSignature({
    method: 'DELETE',
    path: '/:id',
    summary: 'delete social by id',
  })
  async delete(@Param('id') id: number, @ReqUser() user: UserEntity) {
    await this.service.user(user).delete(id);
  }
}
