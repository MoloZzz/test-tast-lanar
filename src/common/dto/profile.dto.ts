import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
    @ApiProperty({ example: 1, description: 'User ID' })
    id: number;
    @ApiProperty({ example: 'user@example.com', description: 'User email' })
    email: string;
    @ApiProperty({ example: 'username', description: 'Username' })
    username: string;
    @ApiProperty({ required: false })
    description?: string;
    @ApiProperty({ example: '2023-10-27T10:00:00.000Z' })
    createdAt: Date;
}

export class UpdateProfileDto {
    @ApiProperty({ required: false })
    username?: string;
    @ApiProperty({ required: false })
    description?: string;
}
