import { AuthService } from '../auth.service';
import { User } from 'src/users/user.schema';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(payload: any): Promise<User>;
}
export {};
