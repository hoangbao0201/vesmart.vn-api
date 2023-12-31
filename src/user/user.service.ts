import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable({})
export class UserService {

    constructor(
        private prismaService: PrismaService
    ) {}

    async userDetail(id: string) : Promise<any> {

        const user = await this.prismaService.user.findUnique({
            where: {
                id: id
            },
        })

        return {
            user: user
        }
    }

}