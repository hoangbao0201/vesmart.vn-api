import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO, RegisterDTO } from "./dto";



@Controller('/api/auth')
export class AuthController {
    constructor(private authService : AuthService) {}

    // POST .../auth/register
    @Post('/register')
    register(@Body() body:RegisterDTO) {
        return this.authService.register(body);
    }

    // POST .../auth/login
    @Post('/login')
    login(@Body() body:LoginDTO) {
        return this.authService.login(body);
    }

}