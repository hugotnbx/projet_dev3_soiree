import { Body, Controller, Post, HttpCode, HttpStatus ,Request,UseGuards,Get} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public,IS_PUBLIC_KEY } from './publicDecorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    

    @HttpCode(HttpStatus.OK)

    @Public()
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.idProfil, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
    return req.user;
    }

}
