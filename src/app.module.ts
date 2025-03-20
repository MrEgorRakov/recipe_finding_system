import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ModeratorModule } from './moderator/moderator.module';
import { AuthModule } from './auth/auth.module';
import { RecipeModule } from './recipe/recipe.module';
import { UserAccountModule } from './user_account/user_account.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, ModeratorModule, AuthModule, RecipeModule, UserAccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
