import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { Recipe } from './entities/recipe.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Recipe])],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
