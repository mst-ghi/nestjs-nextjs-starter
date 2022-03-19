import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('facebook.appId'),
      clientSecret: configService.get<string>('facebook.secret'),
      callbackURL: configService.get<string>('facebook.callBackUrl'),
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails } = profile;

    const user = {
      email: emails[0].value,
      first_name: name.givenName,
      last_name: name.familyName,
      tokens: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    };

    done(null, user);
  }
}
