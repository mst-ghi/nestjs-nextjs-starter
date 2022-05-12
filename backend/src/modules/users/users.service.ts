import { PrismaService } from '@app/prisma';
import { UserEntity } from '@app/prisma/entities';
import { BaseService } from '@app/shared';
import { throwNotFound } from '@app/shared/errors';
import {
  UserProfileIncludeQuery,
  PeoplesListIncludeQuery,
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

  async getPeoples(
    take: number,
    cursor: number = undefined,
    role: string = undefined,
  ) {
    const queryOptions: Prisma.UserFindManyArgs = {
      select: {
        id: true,
        full_name: true,
        username: true,
        email: true,
        phone_number: true,
        status: true,
        created_at: true,
        updated_at: true,
        ...PeoplesListIncludeQuery,
      },
      take: Number(take),
      orderBy: {
        id: 'desc',
      },
    };
    if (cursor) {
      queryOptions.cursor = {
        id: cursor,
      };
    }
    if (role) {
      queryOptions.where = {
        roles: {
          some: {
            key: role,
          },
        },
      };
    }
    return await this.prisma.user.findMany(queryOptions);
  }
}
