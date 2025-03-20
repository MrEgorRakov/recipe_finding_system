import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private UserModule: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.UserModule.create(
      createUserDto as unknown as Partial<User>,
    );
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.UserModule.update(updateUserDto, {
      where: { id: id },
    });
  }

  async findAll() {
    return await this.UserModule.findAll();
  }

  async findOne(id: number) {
    if (isNaN(id)) {
      throw new BadRequestException('Invalid ID: must be a number');
    }
    return await this.UserModule.findByPk(id);
  }

  async remove(id: number) {
    return await this.UserModule.destroy({
      where: { id: id },
    });
  }
}
