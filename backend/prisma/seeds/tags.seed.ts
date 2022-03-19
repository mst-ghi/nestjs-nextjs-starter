import { Logger } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { catchLogger } from './utils';
import { readFileSync } from 'fs';
import { join } from 'path';
import slugify from 'slugify';

const data = JSON.parse(
  readFileSync(join(__dirname, 'json/tags.json'), 'utf-8'),
);
const TagsData: Prisma.TagCreateInput[] = [];

for (let index = 0; index < data.length; index++) {
  const skill = data[index];
  TagsData.push({
    key: slugify(skill.name, '-'),
    title: skill.name,
    is_active: true,
  });
}

const TagsDataSeeder = async (prisma: PrismaClient) => {
  console.log('');

  for (const tag of TagsData) {
    try {
      let result = await prisma.tag.findFirst({ where: { key: tag.key } });
      if (result) {
        result = await prisma.tag.update({
          where: { key: tag.key },
          data: tag,
        });
        Logger.log(`Updated tag with title: ${result.title}`, 'TagsDataSeeder');
      } else {
        result = await prisma.tag.create({
          data: tag,
        });
        Logger.log(`Created tag with title: ${result.title}`, 'TagsDataSeeder');
      }
    } catch (error) {
      catchLogger(error, tag.title);
    }
  }
};

export default TagsDataSeeder;
