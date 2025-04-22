import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ModeratorAuthService } from './moderator-auth.service';
import { ModeratorRegisterDto } from './dto/moderator-register.dto';
import { ModeratorLoginDto } from './dto/moderator-login.dto';

@Controller('moderator')
export class ModeratorAuthController {
  constructor(private readonly moderatorAuthService: ModeratorAuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  register(@Body() dto: ModeratorRegisterDto) {
    return this.moderatorAuthService.register(dto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  login(@Body() dto: ModeratorLoginDto) {
    return this.moderatorAuthService.login(dto);
  }
}
