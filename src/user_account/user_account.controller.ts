import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UserAccountService } from './user_account.service';
import { CreateUserAccountDto } from './dto/create-user_account.dto';
import { UpdateUserAccountDto } from './dto/update-user_account.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user-account')
export class UserAccountController {
  constructor(private readonly userAccountService: UserAccountService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Body() createUserAccountDto: CreateUserAccountDto) {
    const createUserAccount =
      this.userAccountService.create(createUserAccountDto);
    if (createUserAccount == null) {
      throw new Error('noob data');
    }
    return {
      message: 'got the data',
      data: createUserAccount,
    };
  }

  @Get()
  findAll() {
    return this.userAccountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAccountService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() updateUserAccountDto: UpdateUserAccountDto,
  ) {
    const [updateUserAccount] = await this.userAccountService.update(
      +id,
      updateUserAccountDto,
    );
    console.log(updateUserAccount);
    if (updateUserAccount === 0) {
      throw new NotFoundException('no data here');
    }
    return { message: 'Data Updated' };
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async remove(@Param('id') id: number) {
    const destroyUserAccount = await this.userAccountService.remove(+id);
    console.log(destroyUserAccount);
    if (destroyUserAccount === 0) {
      throw new NotFoundException('There is nothing to delete here');
    }
    return { message: 'Data Removed' };
  }
}
