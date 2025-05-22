import { Prisma } from '@prisma/client'
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { HashService } from 'src/shared/services/hash.service'
import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private hashService: HashService,
    ) {}
    private readonly userSelect = {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        profile: true,
        password: false,
    } as const

    async create(createUserDto: CreateUserDto) {
        try {
            const { profile, password, email, ...userData } = createUserDto
            const hashedPassword = await this.hashService.hashPassword(password)
            return await this.prisma.user.create({
                data: {
                    ...userData,
                    email,
                    password: hashedPassword,
                    profile: profile
                        ? {
                              create: profile,
                          }
                        : undefined,
                },
                select: this.userSelect,
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ConflictException('Email đã tồn tại')
            } else {
                throw new BadRequestException('Đã xảy ra lỗi khi tạo người dùng')
            }
        }
    }

    async findAll() {
        return await this.prisma.user.findMany({
            include: {
                profile: true,
            },
        })
    }

    async findOne(id: string) {
        return await this.prisma.user.findUnique({
            where: { id },
            include: {
                profile: true,
            },
        })
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const { profile, ...userData } = updateUserDto
        return await this.prisma.user.update({
            where: { id },
            data: {
                ...userData,
                profile: profile
                    ? {
                          upsert: {
                              create: profile,
                              update: profile,
                          },
                      }
                    : undefined,
            },
            include: {
                profile: true,
            },
        })
    }

    async remove(id: string) {
        await this.prisma.user.delete({
            where: { id },
        })
    }
}
