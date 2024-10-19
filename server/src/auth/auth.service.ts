import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../users/user.schema';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './models/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = new this.userModel({ ...createUserDto, password: hashedPassword });
    return user.save();
  }
  
  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUserInfo(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).select('-password').exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}