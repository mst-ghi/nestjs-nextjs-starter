import { Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export const catchLogger = (error, model: string) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    Logger.debug(`${model}: code ${error.code}`, `Prisma Seeding`);
  } else {
    Logger.debug(error.message, `Prisma ${model} Seeding`);
  }
};
