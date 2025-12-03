import { UserDto } from './user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    profile(id: string): Promise<{
        user: {
            name: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
        };
    }>;
    updateProfile(id: string, dto: UserDto): Promise<{
        name: string | null;
        email: string;
    }>;
}
