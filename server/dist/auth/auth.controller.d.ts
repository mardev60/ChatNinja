import { AuthService } from './auth.service';
import { User } from '../users/user.schema';
import { CreateUserDto } from './models/create-user.dto';
import { LoginDto } from './models/login.dto';
interface UserRequest extends Request {
    user: {
        id: string;
    };
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createUserDto: CreateUserDto): Promise<User>;
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    me(req: UserRequest): Promise<User>;
    findAll(): Promise<User[]>;
}
export {};
