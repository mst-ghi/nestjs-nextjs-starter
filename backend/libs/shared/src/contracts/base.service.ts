import { UserEntity } from '@app/prisma/entities';

export class BaseService {
  _userId: number;
  _user: UserEntity;

  user(user: UserEntity) {
    this._userId = user.id;
    this._user = user;
    return this;
  }

  partial<T>(partial: T, entity: any) {
    return new entity(partial);
  }
}
