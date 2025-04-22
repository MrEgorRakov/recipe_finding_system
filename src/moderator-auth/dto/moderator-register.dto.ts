import { IsEmail, IsNotEmpty } from 'class-validator';

export class ModeratorRegisterDto {
  @IsNotEmpty({ message: 'Moderator name is required' })
  ModeratorName: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Moderator email is required' })
  ModeratorEmail: string;

  @IsNotEmpty({ message: 'Moderator password is required' })
  ModeratorPassword: string;
}
