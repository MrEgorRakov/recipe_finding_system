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
import { ModeratorService } from './moderator.service';
import { CreateModeratorDto } from './dto/create-moderator.dto';
import { UpdateModeratorDto } from './dto/update-moderator.dto';

@Controller('moderator')
export class ModeratorController {
  constructor(private readonly moderatorService: ModeratorService) {}

  @Post('/create')
  async create(@Body() createModeratorDto: CreateModeratorDto) {
    const CreateModerator =
      await this.moderatorService.create(createModeratorDto);
    if (CreateModerator == null) {
      throw new Error('bad data');
    }
    return {
      message: 'moderator created',
      data: CreateModerator,
    };
  }

  @Get()
  findAll() {
    return this.moderatorService.findAll();
  }

  @Get(':id') //localhost:3000/moderator/:id
  async findOne(@Param('id') id: string) {
    const findModerator = await this.moderatorService.findOne(+id);
    if (findModerator == null) {
      throw new NotFoundException('No data here:,(');
    }
    return findModerator;
  }

  @Patch('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateModeratorDto: UpdateModeratorDto,
  ) {
    const [updateModerator] = await this.moderatorService.update(
      +id,
      updateModeratorDto,
    );
    console.log(updateModerator);
    if (updateModerator === 0) {
      throw new NotFoundException('no data here');
    }
    return { message: 'Data Updated' };
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: string) {
    const destroyModerator = await this.moderatorService.remove(+id);
    console.log(destroyModerator);
    if (destroyModerator === 0) {
      throw new NotFoundException('There is nothing to delete here');
    }
    return { message: 'Data Removed' };
  }
}
