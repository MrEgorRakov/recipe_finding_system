import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthUser } from './entities/auth.entity';
import { RegisterDto } from './dto/register.dto';
import { hash, genSalt, compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthUser)
    private readonly authUserModel: typeof AuthUser,
    private JwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const authuser = await this.authUserModel.findOne({
      where: { email: registerDto.email },
    });
    if (authuser) {
      throw new BadRequestException(
        'Eek! This email already exists... maybe try a different one? 🥺',
      );
    }
    const salt = await genSalt(10);
    const hashPassword = await hash(registerDto.password, salt);

    const newUser = await this.authUserModel.create({
      username: registerDto.username,
      email: registerDto.email,
      password: hashPassword,
    });

    return newUser;
  }

  async login(loginDto: LoginDto) {
    // Check if the email exists
    const authUser = await this.authUserModel.findOne({
      where: { email: loginDto.email },
    });

    if (!authUser) {
      throw new UnauthorizedException('This email does not exist. Try login');
    }

    // Compare the provided password with the stored encrypted password
    const isValid = await compare(loginDto.password, authUser.password);
    if (!isValid) {
      throw new UnauthorizedException('Incorrect password. Try harder!.');
    }

    // generate JWT token
    // payload contains the claims or the data being transferred (id).
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const payload = { user_id: authUser.id };
    const token = await this.JwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });

    // Return an access token
    return { access_token: token };
  }

  async getUsertProfile(id: number) {
    return await this.authUserModel.findByPk(id, {
      attributes: ['id', 'username', 'email'],
    });
  }
}
