import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import RolesDataSeeder from './roles.seed';
import TagsDataSeeder from './tags.seed';
import LanguageDataSeeder from './languages.seed';
import UserDataSeeder from './users.seed';
import CountryDataSeeder from './countries.seed';

const prisma = new PrismaClient();

async function main() {
  Logger.verbose(`Start seeding ...`, 'Prisma Seeding');

  await RolesDataSeeder(prisma);
  await UserDataSeeder(prisma);
  await LanguageDataSeeder(prisma);
  await TagsDataSeeder(prisma);
  await CountryDataSeeder(prisma);

  console.log('');
  Logger.verbose(`Seeding finished.`, 'Prisma Seeding');
}

main()
  .catch((e) => {
    Logger.error(e.message, 'Prisma Seeding');
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
