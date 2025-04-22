import { IsEmail, IsNotEmpty } from 'class-validator';

export class ModeratorLoginDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  ModeratorEmail: string;

  @IsNotEmpty({ message: 'Password is required' })
  ModeratorPassword: string;
}
