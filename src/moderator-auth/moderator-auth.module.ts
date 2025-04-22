import { Module } from '@nestjs/common';
import { ModeratorAuthService } from './moderator-auth.service';
import { ModeratorAuthController } from './moderator-auth.controller';
import { Moderator } from './entities/moderator.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '1d' },
    }),
    SequelizeModule.forFeature([Moderator]),
  ],
  controllers: [ModeratorAuthController],
  providers: [ModeratorAuthService, JwtService],
})
export class ModeratorauthModule {}
