/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secretKey = process.env.JWT_SECRET_KEY;

    // Handle missing secret key early, throw an error if it's undefined.
    if (!secretKey) {
      throw new Error(
        'JWT_SECRET_KEY is not defined in the environment variables',
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretKey, // Ensure this is a valid string, not undefined
    });
  }

  async validate(payload: any) {
    return { id: payload.id };
  }
}
