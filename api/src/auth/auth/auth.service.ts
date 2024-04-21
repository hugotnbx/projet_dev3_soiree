import { Injectable,UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,private jwtService: JwtService
    ) {}

    async signIn(idProfil: string, pass: string,): Promise<any> {
      const user = await this.usersService.read(idProfil);
      if (user?.password !== pass || user.idProfil != idProfil){
        
        throw new UnauthorizedException();
      }
      const payload = {username: user.idProfil, expiresIn: '3M' };
      return {
        access_token: await this.jwtService.signAsync(payload),
    };
}

}
