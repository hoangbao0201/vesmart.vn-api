import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { LoginDTO, RegisterDTO } from "./dto";

import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as argon from "argon2"

@Injectable({})
export class AuthService {
    
    constructor(
        private prismaService: PrismaService,
        private configService: ConfigService,
        private jwtService: JwtService,
    ) {}

    async register(authDTO: RegisterDTO) {
        
        try {
            const hashPassword = await argon.hash(authDTO.password);

            const user = await this.prismaService.user.create({
                data: {
                    fullName: authDTO.fullName,
                    username: authDTO.username,
                    email: authDTO.email,
                    password: hashPassword,
                },
                select: {
                    fullName: true,
                    email: true,
                    username: true,
                    createdAt: true,
                    updatedAt: true,
                    level: true,
                    avatarUrl: true,
    
                    password: false
                }
            })

            return {
                message: `Regiter user successfully`,
                users: user
            }
        } catch (error) {
            if(error.code === "P2002") {
                // throw new ForbiddenException(error.message);
                // throw new ForbiddenException("Error in credentials");
                return {
                    success: false,
                    message: "Error in credentials"
                }
            }
            return {
                success: false,
                error: error
            }
        }
    }

    async login(authDTO: LoginDTO) {

        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    email: authDTO.email,
                },
                select: {
                    id: true,
                    password: true
                }
            })
            if(!user) {
                return {
                    success: false,
                    message: "Incorrect account or password"
                }
            }
    
            // Check password
            const checkPassword = await argon.verify(user.password, authDTO.password);
            if(!checkPassword) {
                return {
                    success: false,
                    message: "Incorrect account or password"
                }
            }
    
            // JWT
            delete user.password
    
            return await this.signJwtToken(user.id, authDTO.email);

        } catch (error) {
            return {
                success: false,
                error: error
            }
        }

    }

    //now convert to an object, not string
    async signJwtToken(userId: string, email: string): Promise<{success: boolean, accessToken: string}>{
        const payload = {
            sub: userId,
            email
        }
        const jwtString = await this.jwtService.signAsync(payload, {
            expiresIn: '1h',
            secret: this.configService.get('TOKEN_SETCRET')
        })
        return {
            success: true,
            accessToken: jwtString,
        }
    }

}