import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { MyJwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { CreateBlogDTO, UpdateBlogDTO } from './dto';

@Controller('/api/blogs')
export class BlogController {
    constructor(
        private blogService: BlogService
    ) {}

    // PATH .../api/blogs
    @UseGuards(MyJwtGuard)
    @Post('')
    createPost(
        @GetUser('id') userId: string,
        @Body() createBlogDTO: CreateBlogDTO
    ) {
        return this.blogService.createBlog(userId, createBlogDTO);
    }

    // @UseGuards(MyJwtGuard)
    // @Post('/many')
    // createMany() {
    //     return this.blogService.createMany();
    // }

    @Get()
    findAll(@Query() query: any) {
        return this.blogService.findAll(query);
    }

    @Get(':slug')
    findOne(@Param('slug') slug: string) {
        return this.blogService.findOne(slug);
    }

    @UseGuards(MyJwtGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateGenreDto: any) {
        return this.blogService.update(id, updateGenreDto);
    }

    @UseGuards(MyJwtGuard)
    @Delete(':id')
    remove(
        @GetUser('id') userId: string,
        @Param('id') id: string
    ) {
        return this.blogService.remove(userId, id);
    }
}
