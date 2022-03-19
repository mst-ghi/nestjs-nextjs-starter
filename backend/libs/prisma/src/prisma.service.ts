import { PrismaClient } from '@prisma/client';
import { Global, Injectable } from '@nestjs/common';
import { throwUnprocessableEntity, throwNotFound } from '@app/shared/errors';
@Global()
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({ errorFormat: 'minimal' });
  }

  async findUniqueByIdOrThrow<T>({
    model,
    id,
    notFoundException = true,
    fieldError,
  }: {
    model: string;
    id: number;
    notFoundException?: boolean;
    fieldError?: { field: string; message: string };
  }): Promise<T> {
    const rawModel = await this[model].findUnique({ where: { id } });
    if (!rawModel) {
      if (fieldError) {
        throwUnprocessableEntity([fieldError]);
      } else if (notFoundException) {
        throwNotFound(`${model} not found`);
      }
    }
    return rawModel;
  }
}
