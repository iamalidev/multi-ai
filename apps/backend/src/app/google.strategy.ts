import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID:
        '1014031096542-klssrjp88b6qhdcpu6hhkk9gd5b031sk.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/api/auth/google/callback', // Yangi endpoint
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
