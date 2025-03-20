import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserAccountService } from './user_account.service';
import { CreateUserAccountDto } from './dto/create-user_account.dto';
import { UpdateUserAccountDto } from './dto/update-user_account.dto';

@Controller('user-account')
export class UserAccountController {
  constructor(private readonly userAccountService: UserAccountService) {}

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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserAccountDto: UpdateUserAccountDto,
  ) {
    return this.userAccountService.update(+id, updateUserAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAccountService.remove(+id);
  }
}
