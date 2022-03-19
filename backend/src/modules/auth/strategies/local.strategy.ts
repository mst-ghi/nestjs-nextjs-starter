import { UserStatusEnum } from '@app/enums';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../services/auth.service';
import { UserInactiveException, UserNotFoundException } from '../exceptions';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private user: any;

  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    await this.findUserAndCheckPassword(email, password);
    return this.user;
  }

  async findUserAndCheckPassword(email: string, password: string) {
    this.user = await this.authService.validateUser(email, password);

    if (!this.user) {
      throw new UserNotFoundException();
    }
    if (this.user.status !== UserStatusEnum.Active) {
      throw new UserInactiveException();
    }
  }
}
