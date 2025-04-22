import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript'; // ⬅️ добавляем импорт

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  const sequelize = app.get(Sequelize); // ⬅️ получаем инстанс из Nest
  await sequelize.sync({ alter: true }); // ⬅️ добавляем недостающие колонки

  await app.listen(3001);
}
bootstrap();
