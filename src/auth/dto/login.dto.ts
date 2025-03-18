import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'write your email here' })
  @IsEmail({}, { message: 'that is not an email' })
  email: string;

  @IsNotEmpty({ message: 'write your password here' })
  password: string;
}