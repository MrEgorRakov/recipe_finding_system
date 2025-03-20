import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post('/create')
  async create(@Body() createRecipeDto: CreateRecipeDto) {
    const createRecipe = await this.recipeService.create(createRecipeDto);
    if (createRecipe == null) {
      throw new Error('bad data');
    }
    return {
      message: 'Recipe created successfully!',
      data: createRecipe,
    };
  }

  @Get()
  async findAll() {
    return this.recipeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const findRecipe = await this.recipeService.findOne(+id);
    if (findRecipe == null) {
      throw new NotFoundException('No data found for this recipe');
    }
    return findRecipe;
  }

  @Get('/findname/:name')
  async findname(@Param('name') name: string) {
    const findname = await this.recipeService.findname(name);
    if (findname == null) {
      throw new NotFoundException('No data, what a shame');
    }
    return findname;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    const updatedRecipe = await this.recipeService.update(+id, updateRecipeDto);
    if (!updatedRecipe) {
      throw new NotFoundException('Recipe not found to update');
    }
    return { message: 'Data Updated' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedRecipe = await this.recipeService.remove(+id);
    if (!deletedRecipe) {
      throw new NotFoundException('Recipe not found to delete');
    }
    return { message: 'Recipe deleted successfully' };
  }
}
