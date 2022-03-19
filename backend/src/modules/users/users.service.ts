import { RoleKeysEnum } from '@app/enums';
import { PrismaService } from '@app/prisma';
import { UserEntity } from '@app/prisma/entities';
import { BaseService } from '@app/shared';
import { throwNotFound } from '@app/shared/errors';
import {
  UserProfileIncludeQuery,
  MembersListIncludeQuery,
  MentorsListIncludeQuery,
} from '@app/shared/queries';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService extends BaseService {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async getProfileByUsername(username: string): Promise<UserEntity> {
    const user = await this.prisma.user.findFirst({
      where: { username },
      include: UserProfileIncludeQuery,
    });

    if (!user) {
      throwNotFound('User profile not found by this username');
    }

    return this.partial(user, UserEntity);
  }

  async getMembers(take: number, cursor: number = undefined) {
    const queryOptions: Prisma.UserFindManyArgs = {
      where: {
        roles: {
          some: {
            key: RoleKeysEnum.Member,
          },
        },
      },
      take: Number(take),
      orderBy: {
        id: 'asc',
      },
      include: MembersListIncludeQuery,
    };
    if (cursor) {
      queryOptions.cursor = {
        id: cursor,
      };
    }
    return await this.prisma.user.findMany(queryOptions);
  }

  async getMentors(take: number, cursor: number = undefined) {
    const queryOptions: Prisma.UserFindManyArgs = {
      where: {
        roles: {
          some: {
            key: RoleKeysEnum.Mentor,
          },
        },
      },
      take: Number(take),
      orderBy: {
        id: 'asc',
      },
      include: MentorsListIncludeQuery,
    };
    if (cursor) {
      queryOptions.cursor = {
        id: cursor,
      };
    }
    return await this.prisma.user.findMany(queryOptions);
  }
}
