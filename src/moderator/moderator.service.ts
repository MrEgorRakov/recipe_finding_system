import { Injectable } from '@nestjs/common';
import { CreateModeratorDto } from './dto/create-moderator.dto';
import { UpdateModeratorDto } from './dto/update-moderator.dto';
import { Moderator } from './entities/moderator.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ModeratorService {
  constructor(
    @InjectModel(Moderator)
    private readonly ModeratorModule: typeof Moderator,
  ) {}

  async create(createModeratorDto: CreateModeratorDto) {
    return await this.ModeratorModule.create(
      createModeratorDto as unknown as Partial<Moderator>,
    );
  }

  async update(id: number, updateModeratorDto: UpdateModeratorDto) {
    return await this.ModeratorModule.update(updateModeratorDto, {
      where: { id: id },
    });
  }

  async findAll() {
    return await this.ModeratorModule.findAll();
  }

  async findOne(id: number) {
    return await this.ModeratorModule.findByPk(id);
  }

  async remove(id: number) {
    return await this.ModeratorModule.destroy({
      where: { id: id },
    });
  }
}
