import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const categoryAlreadyExists = await this.findByCategory(
      createCategoryDto.category,
    );

    if (categoryAlreadyExists) {
      throw new HttpException('Category already exists', HttpStatus.CONFLICT);
    }

    return await this.create(createCategoryDto);
  }

  async getAllCategories(): Promise<Category[]> {
    return this.findAll();
  }

  async getCategory(category: string): Promise<Category> {
    return this.findByCategory(category);
  }

  private async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = new this.categoryModel(createCategoryDto);

    return await category.save();
  }

  private async findAll(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }

  private async findByCategory(category: string): Promise<Category> {
    return await this.categoryModel.findOne({ category });
  }
}
