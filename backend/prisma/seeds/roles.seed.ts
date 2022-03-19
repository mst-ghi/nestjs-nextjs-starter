import { Logger } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { catchLogger } from './utils';

const RolesData: Prisma.RoleCreateInput[] = [
  {
    key: 'super-admin',
    title: 'Super Admin',
    department: 'dev',
    description: 'This role has all permissions',
  },
  {
    key: 'admin',
    title: 'Admin',
    department: 'exec',
    description: 'This role has some permissions',
  },
  {
    key: 'mentor',
    title: 'Mentor',
    department: 'exec',
    description: 'This role has some permissions',
  },
  {
    key: 'member',
    title: 'Member',
    department: 'exec',
    description: 'This role has some permissions',
  },
];

const RolesDataSeeder = async (prisma: PrismaClient) => {
  console.log('');

  for (const role of RolesData) {
    try {
      let result = await prisma.role.findFirst({ where: { key: role.key } });
      if (result) {
        result = await prisma.role.update({
          where: { key: role.key },
          data: role,
        });
        Logger.log(
          `Updated role with title: ${result.title}`,
          'RolesDataSeeder',
        );
      } else {
        result = await prisma.role.create({
          data: role,
        });
        Logger.log(
          `Created role with title: ${result.title}`,
          'RolesDataSeeder',
        );
      }
    } catch (error) {
      catchLogger(error, role.title);
    }
  }
};

export default RolesDataSeeder;
