import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateBlogDTO, UpdateBlogDTO } from "./dto";

@Injectable({})
export class BlogService {

    constructor(
        private prismaService: PrismaService
    ) {}

    async createBlog(userId: string, body: CreateBlogDTO) : Promise<any> {
        try {
            const { slug, title, thumbnail, description, content } = body;

            const blogHashtags = ["vesmart", "robothutbui", "suachuadanang"];

            const newBlog = await this.prismaService.blog.create({
                data: {
                    slug: slug,
                    title: title,
                    thumbnail: thumbnail,

                    author: {
                        connect: {
                            id: userId
                        }
                    },
                    status: null,
                    description: description || null,

                    content: content,
                    
                    blogHashtags: {
                        create: blogHashtags.map(tag => (
                            {
                                Hashtag: {
                                    connectOrCreate: {
                                        where: {
                                            name: tag,
                                        },
                                        create: {
                                            name: tag
                                        }
                                    }
                                }
                            }
                        ))
                    }
                }
            })

            delete newBlog.content

            return {
                success: true,
                message: "Create blogs successful",
                blog: newBlog
            };
        } catch (error) {
            return {
                success: false,
                message: "error blogs successful",
                error: error
            };
        }
    
    }

    async findAll(query: any) {
        try {

            const { page = 0, limit = 10 } = query;

            const blogs = await this.prismaService.blog.findMany({
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    thumbnail: true,
                    author: {
                        select: {
                            id: true,
                            fullName: true,
                            username: true,
                            email: true
                        }
                    },
                    status: true,
                    description: true,
                },
                orderBy: {
                    createdAt: "desc"
                },
                take: Number(limit) || 10,
                skip: Number(page) ? (page-1)*limit : 0
            });
        
            return {
                success: true,
                message: "Get blogs successful",
                blogs: blogs
            };
        } catch (error) {
            return {
                success: false,
                message: "error blogs successful",
                error: error
            };
        }
    }

    async findOne(slug: string) {
        try {
            // let lastHyphenIndex = slug.lastIndexOf('-');
            // const checkLast = slug.slice(lastHyphenIndex+1, slug.length)
            // let nameSlug = slug;
            // if ( checkLast === '' || Number(checkLast) > 0) {
            //     nameSlug = slug.slice(0, lastHyphenIndex);
            // }

            const blog = await this.prismaService.blog.findFirst({
                where: {
                    slug: slug
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            fullName: true,
                            username: true,
                            email: true
                        }
                    }
                }
            })

            return {
                success: true,
                message: "Get blog successful",
                blog: blog
            };
        } catch (error) {
            return {
                success: false,
                message: "error blogs successful",
                error: error
            };
        }
    }

    async update(id: string, updateGenreDto: UpdateBlogDTO) {
        try {
            const updateBlog = await this.prismaService.blog.update({
                where: {
                    id: id
                },
                data: {
                    ...updateGenreDto
                }
            })
    
            return {
                success: true,
                message: "Update blog successful",
                blog: updateBlog
            }
        } catch (error) {
            return {
                success: false,
                message: "error blogs successful",
                error: error
            };
        }
    }

    async remove(userId: string, id: string) {
        try {
            const updateBlog = await this.prismaService.blog.delete({
                where: {
                    id: id,
                    author: {
                        id: userId
                    }
                },
            })
    
            return {
                success: true,
                message: "Delete blog successful"
            }
        } catch (error) {
            return {
                success: false,
                message: "error blogs successful",
                error: error
            };
        }
    }
}