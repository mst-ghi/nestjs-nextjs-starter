import { RoleKeysEnum } from '../../libs/enums/src/role-keys.enum';
import { Logger } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { sha3_256 } from 'js-sha3';
import { catchLogger } from './utils';

const UserData: Prisma.UserCreateInput[] = [
  {
    full_name: 'Mostafa Gholami',
    username: 'mostafa',
    email: 'mostafagholamidev@gmail.com',
    password: sha3_256(sha3_256('12345678')),
  },
];

const UserDataSeeder = async (prisma: PrismaClient) => {
  console.log('');

  const role = await prisma.role.findFirst({
    where: { key: RoleKeysEnum.SuperAdmin },
  });

  for (const user of UserData) {
    try {
      let result = await prisma.user.findFirst({
        where: { email: user.email },
      });
      const data = {
        ...user,
      };
      if (role) {
        data['roles'] = {
          connect: [
            {
              id: role.id,
            },
          ],
        };
      }
      if (result) {
        result = await prisma.user.update({
          where: { email: user.email },
          data,
        });
        Logger.log(
          `Updated user with username: ${result.username}`,
          'UserDataSeeder',
        );
      } else {
        result = await prisma.user.create({
          data,
        });
        Logger.log(
          `Created user with username: ${result.username}`,
          'UserDataSeeder',
        );
      }
    } catch (error) {
      catchLogger(error, user.username);
    }
  }
};

export default UserDataSeeder;
