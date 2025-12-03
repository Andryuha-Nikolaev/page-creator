import { AuthDto } from 'src/auth/dto/auth.dto';
import { UserDto } from './user.dto';
import { PrismaService } from 'src/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getById(id: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    getByEmail(email: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    getProfile(id: string): Promise<{
        user: {
            name: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
        };
    }>;
    create(dto: AuthDto): Promise<{
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
    }>;
    update(id: string, dto: UserDto): Promise<{
        name: string | null;
        email: string;
    }>;
}
