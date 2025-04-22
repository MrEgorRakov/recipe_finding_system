/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * JWT стратегия для авторизации модераторов
 */
@Injectable()
export class ModeratorJwtStrategy extends PassportStrategy(
  Strategy,
  'moderator-jwt',
) {
  constructor() {
    const secretKey = process.env.JWT_SECRET_KEY2;

    if (!secretKey) {
      throw new Error(
        'JWT_SECRET_KEY is not defined in the environment variables',
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Берем токен из заголовка Authorization
      ignoreExpiration: false, // Проверяем срок действия токена
      secretOrKey: secretKey, // Секретный ключ
    });
  }

  /**
   * Валидация модераторского токена
   * @param payload Данные из токена
   */
  async validate(payload: any) {
    if (!payload || !payload.ModeratorId || payload.role !== 'moderator') {
      throw new UnauthorizedException('Invalid moderator token');
    }

    // Это попадёт в req.user
    return {
      id: payload.ModeratorId,
      name: payload.ModeratorName,
      role: payload.role,
    };
  }
}
