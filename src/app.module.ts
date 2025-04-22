import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { ModeratorModule } from './moderator/moderator.module';
import { AuthModule } from './auth/auth.module';
import { RecipeModule } from './recipe/recipe.module';
import { UserAccountModule } from './user_account/user_account.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true, // ✅ будет подхватывать модели из всех forFeature
      synchronize: true, // ✅ будет создавать/обновлять таблицы
    }),

    UserModule,
    ModeratorModule,
    AuthModule,
    RecipeModule,
    UserAccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
