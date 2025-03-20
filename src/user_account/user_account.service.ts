import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserAccountDto } from './dto/create-user_account.dto';
import { UpdateUserAccountDto } from './dto/update-user_account.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserAccount } from './entities/user_account.entity';

@Injectable()
export class UserAccountService {
  constructor(
    @InjectModel(UserAccount)
    private UserAccountModule: typeof UserAccount,
  ) {}

  async create(createUserAccountDto: CreateUserAccountDto) {
    return await this.UserAccountModule.create(
      createUserAccountDto as unknown as Partial<UserAccount>,
    );
  }
  async findAll() {
    return await this.UserAccountModule.findAll();
  }

  async findOne(id: number) {
    if (isNaN(id)) {
      throw new BadRequestException('Invalid ID: must be a number');
    }
    return await this.UserAccountModule.findByPk(id);
  }

  async update(id: number, updateUserAccountDto: UpdateUserAccountDto) {
    return await this.UserAccountModule.update(updateUserAccountDto, {
      where: { id: id },
    });
  }

  async remove(id: number) {
    return await this.UserAccountModule.destroy({
      where: { id: id },
    });
  }
}
