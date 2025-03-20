import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipeService {
  async findname(name: string) {
    return await this.RecipeModule.findOne({
      where: {
        name: name,
      },
    });
  }
  constructor(
    @InjectModel(Recipe)
    private RecipeModule: typeof Recipe,
  ) {}

  async create(createRecipeDto: CreateRecipeDto) {
    return await this.RecipeModule.create(
      createRecipeDto as unknown as Partial<Recipe>,
    );
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return await this.RecipeModule.update(updateRecipeDto, {
      where: { id: id },
    });
  }

  async findAll() {
    return await this.RecipeModule.findAll();
  }

  async findOne(id: number) {
    return await this.RecipeModule.findByPk(id);
  }

  async remove(id: number) {
    return await this.RecipeModule.destroy({
      where: { id: id },
    });
  }
}
