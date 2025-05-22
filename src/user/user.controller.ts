import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ResponseMessage } from 'src/decorator/customize.decorator'

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @ResponseMessage('Create user successfully')
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @Get()
    @ResponseMessage('Fetch users successfully')
    findAll() {
        return this.userService.findAll()
    }

    @Get(':id')
    @ResponseMessage('Fetch user successfully')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id)
    }

    @Patch(':id')
    @ResponseMessage('Update user successfully')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto)
    }

    @Delete(':id')
    @ResponseMessage('Delete user successfully')
    remove(@Param('id') id: string) {
        return this.userService.remove(id)
    }
}
