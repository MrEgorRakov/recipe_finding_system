import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto) {
    const createUser = await this.userService.create(createUserDto);
    if (createUser == null) {
      throw new Error('bad data');
    }
    return {
      message: 'user created',
      data: createUser,
    };
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id') //localhost:3000/customer/:id
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    const findUser = await this.userService.findOne(+id);
    if (findUser == null) {
      throw new NotFoundException('No data here:,(');
    }
    return findUser;
  }

  @Patch('/update/:id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const [updateUser] = await this.userService.update(+id, updateUserDto);
    console.log(updateUser);
    if (updateUser === 0) {
      throw new NotFoundException('no data here');
    }
    return { message: 'Data Updated' };
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: number) {
    const destroyUser = await this.userService.remove(+id);
    console.log(destroyUser);
    if (destroyUser === 0) {
      throw new NotFoundException('There is nothing to delete here');
    }
    return { message: 'Data Removed' };
  }
}
