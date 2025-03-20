import { Module } from '@nestjs/common';
import { ModeratorService } from './moderator.service';
import { ModeratorController } from './moderator.controller';
import { Moderator } from './entities/moderator.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Moderator])],
  controllers: [ModeratorController],
  providers: [ModeratorService],
})
export class ModeratorModule {}
