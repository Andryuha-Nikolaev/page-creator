import { User } from 'src/_gen/prisma-class/user';
export declare class UserDto {
    email?: string;
    name?: string;
    password?: string;
}
declare const UserWithoutPassword_base: import("@nestjs/common").Type<Omit<User, "password">>;
declare class UserWithoutPassword extends UserWithoutPassword_base {
}
export declare class UserResponseDto {
    user: UserWithoutPassword;
}
declare const UserUpdateResponseDto_base: import("@nestjs/common").Type<Omit<User, "id" | "createdAt" | "updatedAt" | "password">>;
export declare class UserUpdateResponseDto extends UserUpdateResponseDto_base {
}
export {};
