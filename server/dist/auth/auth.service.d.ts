import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.schema';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './models/create-user.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    login(email: string, password: string): Promise<{
        token: string;
    }>;
    findUserByEmail(email: string): Promise<User | null>;
    findUserById(id: string): Promise<User>;
    getUserInfo(id: string): Promise<UserDocument | null>;
    findAll(): Promise<User[]>;
}
