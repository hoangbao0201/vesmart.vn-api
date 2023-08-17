import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('/api/users')
export class UserController {

    constructor(
        private userService: UserService
    ) {}

    // GET .../api/users/:id/detail
    @Post('/:id/detail')
    async userDetail(@Param('id') id: string) {
        return this.userService.userDetail(id);
    }

    // GET .../api/users/me
    @UseGuards(MyJwtGuard)
    @Get('me')
    async me(@GetUser() user: User) {
        return user;
    }
}
