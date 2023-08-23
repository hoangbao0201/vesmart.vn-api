import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
    constructor(private prismaService: PrismaService) {}

    async create(createProductDto: CreateProductDto) {
        try {
            const newProduct = await this.prismaService.product.create({
                data: {
                    title: "Title Test 1",
                    slug: "slug-test-1",
                    brand: "Brand Test 1",
                    description: "Description Test 1",
                    price: 250000,
                    stock: 27,
                    images: {
                        createMany: {
                            data: [
                                {
                                    url: "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-li9xh03y7nkc7d",
                                    publicId: "Image PublicId Test 1"
                                },
                                {
                                    url: "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-li9xh03y3fv0ba",
                                    publicId: "Image PublicId Test 2"
                                }
                            ]
                        }
                    }
                }
            })

            return {
                success: true,
                message: 'Create product successful',
                product: newProduct
            };
        } catch (error) {
            return {
                success: false,
                message: 'error product successful',
                error: error,
            };
        }
    }

    async findAll(query: any) {
        try {

            const { page = 0, limit = 10 } = query;

            const products = await this.prismaService.product.findMany({
                select: {
                    id: true,
                    title: true,
                    brand: true,
                    images: true,
                    price: true,
                    stock: true,
                    rating: true,
                    description: true,
                    createdAt: true,
                    updatedAt: true       
                },
                orderBy: {
                    createdAt: "desc"
                },
                take: Number(limit) || 10,
                skip: Number(page) ? (page-1)*limit : 0
            });
        
            return {
                success: true,
                message: "Get products successful",
                products: products
            };
        } catch (error) {
            return {
                success: false,
                message: "error products successful",
                error: error
            };
        }
    }

    async findOne(id: string) {
        try {
            const product = await this.prismaService.product.findUnique({
                where: {
                    id: id
                },
                select: {
                    id: true,
                    title: true,
                    brand: true,
                    images: {
                        select: {
                            url: true
                        }
                    },
                    price: true,
                    stock: true,
                    rating: true,
                    description: true,
                    createdAt: true,
                    updatedAt: true       
                }
            });
        
            return {
                success: true,
                message: "Get product successful",
                product: product
            };
        } catch (error) {
            return {
                success: false,
                message: "error product successful",
                error: error
            };
        }
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        try {
            const updateProduct = await this.prismaService.product.update({
                where: {
                    id: id
                },
                data: {
                    ...updateProductDto
                }
            })
    
            return {
                success: true,
                message: "Update product successful",
                product: updateProduct
            }
        } catch (error) {
            return {
                success: false,
                message: "error product successful",
                error: error
            };
        }
    }

    remove(id: number) {
        return `This action removes a #${id} product`;
    }
}
