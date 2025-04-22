/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Moderator } from './entities/moderator.entity';
import { ModeratorRegisterDto } from './dto/moderator-register.dto';
import { ModeratorLoginDto } from './dto/moderator-login.dto';

@Injectable()
export class ModeratorAuthService {
  JwtService: any;
  constructor(
    @InjectModel(Moderator)
    private readonly ModeratorauthModule: typeof Moderator,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Регистрация нового модератора
   * @param dto Данные регистрации модератора
   * @returns сообщение об успешной регистрации
   */
  async register(dto: ModeratorRegisterDto) {
    const { ModeratorName, ModeratorEmail, ModeratorPassword } = dto;

    // Проверяем, существует ли уже модератор с таким email
    const existing = await this.ModeratorauthModule.findOne({
      where: { ModeratorEmail },
    });

    if (existing) {
      throw new ConflictException('Moderator with this email already exists');
    }

    // Хэшируем пароль перед сохранением
    const hashedPassword = await bcrypt.hash(ModeratorPassword, 10);

    // Создаём нового модератора
    const moderator = await this.ModeratorauthModule.create({
      ModeratorName,
      ModeratorEmail,
      ModeratorPassword: hashedPassword,
    });

    // Сохраняем модератора в БД
    await moderator.save();

    return { message: 'Moderator registered successfully' };
  }

  /**
   * Авторизация модератора
   * @param dto Данные входа
   * @returns accessToken и краткая информация о модераторе
   */
  async login(dto: ModeratorLoginDto) {
    const { ModeratorEmail, ModeratorPassword } = dto;

    // Ищем модератора по email
    const moderator = await this.ModeratorauthModule.findOne({
      where: { ModeratorEmail },
    });

    if (!moderator) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Сравниваем введённый пароль с сохранённым хэшем
    const isMatch = await bcrypt.compare(
      ModeratorPassword,
      moderator.ModeratorPassword,
    );

    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Создаём payload для токена
    const payload = {
      ModeratorId: moderator.ModeratorId,
      ModeratorName: moderator.ModeratorName,
      role: 'moderator',
    };

    // Подписываем JWT токен
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY2, // можно задать ключ в .env
    });

    // Возвращаем токен и данные модератора
    return {
      access_token: accessToken,
      moderator: {
        id: moderator.ModeratorId,
        name: moderator.ModeratorName,
        email: moderator.ModeratorEmail,
      },
    };
  }

  /**
   * Получить профиль модератора по его ID
   * @param id ID модератора
   * @returns публичный профиль модератора
   */
  async getModeratorProfile(id: number) {
    return await this.ModeratorauthModule.findOne({
      where: { ModeratorId: id },
      attributes: ['ModeratorId', 'ModeratorName', 'ModeratorEmail'],
    });
  }
}
