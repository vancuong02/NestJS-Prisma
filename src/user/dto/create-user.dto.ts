import { Role } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsEmail, IsString, IsOptional, ValidateNested, MinLength } from 'class-validator'

export class ProfileDto {
    @IsString()
    firstName: string

    @IsString()
    lastName: string

    @IsString()
    @IsOptional()
    phoneNumber?: string

    @IsString()
    @IsOptional()
    address?: string
}

export class CreateUserDto {
    @IsEmail()
    email: string

    @IsString()
    @MinLength(6)
    password: string

    @IsOptional()
    role?: Role

    @IsOptional()
    @ValidateNested()
    @Type(() => ProfileDto)
    profile?: ProfileDto
}
