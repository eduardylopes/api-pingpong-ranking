import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly playersService: PlayersService,
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

  async updateCategory(_id: string, updateCategoryDto: UpdateCategoryDto) {
    const categoryFound = await this.findById(_id);

    if (!categoryFound) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const categoryAlreadyExists = await this.findByCategory(
      updateCategoryDto.category,
    );

    if (
      updateCategoryDto.category !== categoryFound.category &&
      categoryAlreadyExists
    ) {
      throw new HttpException('Category already exists', HttpStatus.CONFLICT);
    }

    return await this.update(_id, updateCategoryDto);
  }

  async getAllCategories(): Promise<Category[]> {
    return this.findAll();
  }

  async getCategory(category: string): Promise<Category> {
    const categoryFound = await this.findByCategory(category);

    if (!categoryFound) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return categoryFound;
  }

  async assignCategoryToPlayer(
    category: string,
    playerId: string,
  ): Promise<void> {
    const categoryFound = await this.findByCategory(category);

    if (!categoryFound) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const playerFound = await this.playersService.getPlayer(playerId);

    if (!playerFound) {
      throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
    }

    const playerAlreadyInCategory = await this.findPlayerInCategory(
      category,
      playerId,
    );

    if (playerAlreadyInCategory.length) {
      throw new HttpException(
        'Player already in category',
        HttpStatus.BAD_REQUEST,
      );
    }

    categoryFound.players.push(playerId);

    await this.updateByCategory(category, categoryFound);
  }

  private async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = new this.categoryModel(createCategoryDto);

    return await category.save();
  }

  private async update(
    _id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoryModel.findOneAndUpdate(
      { _id },
      { $set: updateCategoryDto },
      { new: true },
    );
  }

  private async updateByCategory(
    category: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoryModel.findOneAndUpdate(
      { category },
      { $set: updateCategoryDto },
      { new: true },
    );
  }

  private async findAll(): Promise<Category[]> {
    return await this.categoryModel.find().populate('players');
  }

  private async findByCategory(category: string): Promise<Category> {
    return await this.categoryModel.findOne({ category });
  }

  private async findById(_id: string): Promise<Category> {
    return await this.categoryModel.findOne({ _id });
  }

  private async findPlayerInCategory(category: string, playerId: any) {
    return await this.categoryModel
      .find({ category })
      .where('players')
      .in(playerId);
  }
}
