import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class ProductService {
    constructor(private prismaService: PrismaService) {}

    async create(createProductDto: CreateProductDto) {
        try {
            const sku1 = String(uuidv4());
            const sku2 = String(uuidv4());
            const sku3 = String(uuidv4());
            const sku4 = String(uuidv4());
            const sku5 = String(uuidv4());
            const sku6 = String(uuidv4());

            const newProduct = await this. prismaService.product.create({
                data: {
                   title: "Phụ kiện Robot Hút Bụi Roborock S7, S7 MaxV, S7 MaxV Ultra - Lọc Hepa, Chổi chính, Chổi cạnh, Khăn Lau, Túi đựng rác",
                   slug: "phu-kien-robot-hut-bui-roborock-s7-s7-maxv-s7-maxv-ultra-loc-hepa-choi-chinh-choi-canh-khan-lau-tui-dung-rac",
                   brand: "VESMART",
                   description: `
                   Mô tả sản phẩm: 

                   Phụ kiện Robot Hút Bụi Roborock S7, S7 MaxV, S7 MaxV Ultra - Lọc Hepa, Chổi chính, Chổi cạnh, Khăn Lau, Túi đựng rác
                   
                   * Chổi chính * 1 chiếc
                   
                   * Lọc bụi * 1 chiếc
                   
                   * Khăn lau * 1 chiếc
                   
                   * Chổi cạnh * 1 chiếc
                   
                   * Túi rác * 1 chiếc
                   `,
                    productDetail: {
                        create: {
                            productInformationItems: {
                                create: [
                                    {
                                        name: "Hạn bảo hành",
                                        value: "1 tháng"
                                    },
                                    {
                                        name: "Loại bảo hành",
                                        value: "Không bảo hành"
                                    },
                                    {
                                        name: "Lưu lượng không khí",
                                        value: "350CFM"
                                    },
                                    {
                                        name: "Loại máy hút bụi và thiết bị làm sạch",
                                        value: "Khác"
                                    },
                                    {
                                        name: "Tiêu thụ điện năng",
                                        value: "20W"
                                    },
                                    {
                                        name: "Kích thước (dài x rộng x cao)",
                                        value: "XXX"
                                    },
                                    {
                                        name: "Kho hàng",
                                        value: "16"
                                    },
                                    {
                                        name: "Gửi từ",
                                        value: "Đà Nẵng"
                                    },
                                ]
                            }
                        }
                    },
                    images: {
                        create: [
                            {
                                url: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lkzghjev5rkt21",
                                publicId: "vn-11134207-7r98o-lkzghjev5rkt21"
                            },
                            {
                                url: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lkzghjev76595b",
                                publicId: "vn-11134207-7r98o-lkzghjev76595b"
                            },
                            {
                                url: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lkzghjev8kpp8e",
                                publicId: "vn-11134207-7r98o-lkzghjev8kpp8e"
                            },
                            {
                                url: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lkzghjev9za59c",
                                publicId: "vn-11134207-7r98o-lkzghjev9za59c"
                            },
                            {
                                url: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lkzghjevbdulbc",
                                publicId: "vn-11134207-7r98o-lkzghjevbdulbc"
                            },
                            {
                                url: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lkzghjevcsf1be",
                                publicId: "vn-11134207-7r98o-lkzghjevcsf1be"
                            },
                        ]
                    },
                    variants: {
                        create: [
                            {
                                name: "Phân Loại",
                                position: "1",
                                subVariants: {
                                    create: [
                                        {
                                            name: "Lọc Hepa",
                                            position: "1-1"
                                        },
                                        {
                                            name: "Chổi phụ",
                                            position: "1-2"
                                        },
                                        {
                                            name: "Chổi chính",
                                            position: "1-3"
                                        },
                                        {
                                            name: "Dẻ lâu",
                                            position: "1-4"
                                        },
                                    ]
                                }
                            }
                        ]
                    },
                    skus: {
                        create: [
                            {
                                sku: "1-1",
                                stock: 0,
                                price: 39000,
                            },
                            {
                                sku: "1-2",
                                stock: 0,
                                price: 40000
                            },
                            {
                                sku: "1-3",
                                stock: 0,
                                price: 40000
                            },
                            {
                                sku: "1-4",
                                stock: 0,
                                price: 37000
                            },
                        ],
                    },
                }
            });

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
                // select: {
                //     id: true,
                //     title: true,
                //     brand: true,
                //     images: true,
                //     rating: true,
                //     description: true,
                //     createdAt: true,
                //     updatedAt: true       
                // },
                include: {
                    images: {
                        select: {
                            url: true
                        },
                        take: 1
                    },
                    skus: true
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
            const positions = ["1-2", "1-3"];

            const orConditions = positions.map(pos => {
                const [mainPos, _] = pos.split("-");
                return {
                    position: mainPos,
                    subVariants: {
                        some: {
                            position: pos
                        }
                    }
                };
            });

            const product = await this.prismaService.product.findUnique({
                where: {
                    id: id
                },
                select: {
                    title: true,
                    images: {
                        take: 1
                    },
                    variants: {
                        where: {
                            OR: orConditions
                        },
                        select: {
                            name: true,
                            subVariants: {
                                select: {
                                    name: true
                                },
                                where: {
                                    OR: positions.map(pos => ({ position: pos }))
                                }
                            }
                        }
                    }
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
                // data: {
                //     productDetail: {
                //         create: {
                //             productInformationItems: {
                //                 createMany: {
                //                     data: [
                //                         {
                //                             name: "Loại bảo hành",
                //                             value: "Bảo hành nhà sản xuất"
                //                         },
                //                         {
                //                             name: "Loại da",
                //                             value: "PVC"
                //                         },
                //                         {
                //                             name: "Nhân vật",
                //                             value: "Hoạt hình"
                //                         },
                //                         {
                //                             name: "Xuất xứ",
                //                             value: "Trung Quốc"
                //                         },
                //                         {
                //                             name: "Kho hàng",
                //                             value: "678"
                //                         },
                //                         {
                //                             name: "Gửi từ",
                //                             value: "Đà Nẵng"
                //                         }
                //                     ]
                //                 }
                //             }
                //         }
                //     }
                // }
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

    async remove(id: string) {
        try {
            const removeProduct = await this.prismaService.product.delete({
                where: {
                    id: id
                }
            })
            
            return {
                success: true,
                message: "Remove product successful",
                product: removeProduct
            }
        } catch (error) {
            return {
                success: false,
                message: "error product successful",
                error: error
            };
        }
    }
}