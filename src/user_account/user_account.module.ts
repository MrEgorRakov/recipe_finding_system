import { Module } from '@nestjs/common';
import { UserAccountService } from './user_account.service';
import { UserAccountController } from './user_account.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserAccount } from './entities/user_account.entity';

@Module({
  imports: [SequelizeModule.forFeature([UserAccount])],
  controllers: [UserAccountController],
  providers: [UserAccountService],
})
export class UserAccountModule {}
