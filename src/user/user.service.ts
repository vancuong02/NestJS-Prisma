import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        const { profile, ...userData } = createUserDto
        return this.prisma.user.create({
            data: {
                ...userData,
                profile: profile
                    ? {
                          create: profile,
                      }
                    : undefined,
            },
            include: {
                profile: true,
            },
        })
    }

    async findAll() {
        return this.prisma.user.findMany({
            include: {
                profile: true,
            },
        })
    }

    async findOne(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
            include: {
                profile: true,
            },
        })
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const { profile, ...userData } = updateUserDto
        return this.prisma.user.update({
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
        return this.prisma.user.delete({
            where: { id },
        })
    }
}
