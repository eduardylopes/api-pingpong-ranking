import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AssignCategoryToPlayerDto } from './dtos/assign-category-to-player.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Category } from './interfaces/category.interface';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return await this.categoryService.getAllCategories();
  }

  @Get(':category')
  async getCategory(@Param('category') category: string): Promise<Category> {
    return await this.categoryService.getCategory(category);
  }

  @Put(':_id')
  async updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('_id') _id: string,
  ): Promise<Category> {
    return await this.categoryService.updateCategory(_id, updateCategoryDto);
  }

  @Post(':category/player/:playerId')
  async assignCategoryToPlayer(
    @Param() { category, playerId }: AssignCategoryToPlayerDto,
  ): Promise<void> {
    return await this.categoryService.assignCategoryToPlayer(
      category,
      playerId,
    );
  }
}
