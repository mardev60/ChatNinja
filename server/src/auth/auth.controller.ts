import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/user.schema';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from './models/create-user.dto';
import { LoginDto } from './models/login.dto';

interface UserRequest extends Request {
  user: { id: string };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Request() req: UserRequest): Promise<User> {
      try {
          console.log(req.user);
          return this.authService.getUserInfo(req.user.id);
      } catch (error) {
          console.error('Error in /auth/me:', error);
          throw error; 
      }
  }
  

  @Get()
  async findAll(): Promise<User[]> {
    return this.authService.findAll();
  }
}