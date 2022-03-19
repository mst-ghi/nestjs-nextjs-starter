import { Logger } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { catchLogger } from './utils';
import { readFileSync } from 'fs';
import { join } from 'path';

const data = JSON.parse(
  readFileSync(join(__dirname, 'json/language.json'), 'utf-8'),
);
const keys = Object.keys(data);
const LanguageData: Prisma.LanguageCreateInput[] = [];

for (let index = 0; index < keys.length; index++) {
  const key = keys[index];
  LanguageData.push({
    key,
    title: data[key],
  });
}

const LanguageDataSeeder = async (prisma: PrismaClient) => {
  console.log('');

  for (const language of LanguageData) {
    try {
      let result = await prisma.language.findFirst({
        where: { key: language.key },
      });
      if (result) {
        result = await prisma.language.update({
          where: { key: language.key },
          data: language,
        });
        Logger.log(
          `Updated language with title: ${result.title}`,
          'LanguageDataSeeder',
        );
      } else {
        result = await prisma.language.create({
          data: language,
        });
        Logger.log(
          `Created language with title: ${result.title}`,
          'LanguageDataSeeder',
        );
      }
    } catch (error) {
      catchLogger(error, language.title);
    }
  }
};

export default LanguageDataSeeder;
