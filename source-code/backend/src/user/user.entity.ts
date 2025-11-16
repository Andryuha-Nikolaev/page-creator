import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '@prisma/client';

class UserEntity implements Omit<User, 'password'> {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  email: string;

  @ApiProperty({
    type: String,
    required: false,
    nullable: true,
    example: 'string | null',
  })
  name: string | null;
}

export class UserResponse {
  @ApiProperty()
  user: UserEntity;
}

export class UserUpdateResponse extends OmitType(UserEntity, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
