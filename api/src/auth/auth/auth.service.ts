import { Injectable,UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,private jwtService: JwtService
    ) {}

    async signIn(idProfil: number, username: string, pass: string,): Promise<any> {
      const user = await this.usersService.read(idProfil);
      if (user?.password !== pass || user.username != username){
        
        throw new UnauthorizedException();
      }
      const payload = {username: user.idProfil };
      return {
        access_token: await this.jwtService.signAsync(payload, {
          secret: jwtConstants.secret,
          expiresIn: '62d',
        }),
    };
}

}
