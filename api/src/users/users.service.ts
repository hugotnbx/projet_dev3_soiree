import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { UsersDto } from './dto/users.dto';

@Injectable()
export class UsersService{
    constructor(
      @InjectRepository(Users)
      private readonly usersRepository: Repository<Users>,
    ) {}

    async findAll(): Promise<Users[]> {
      return await this.usersRepository.find();
    }

    async read(idProfil: string): Promise<Users>{
      return await this.usersRepository.findOne({
        where: {
          idProfil,
        }
      });
    }

    async create(usersDto : UsersDto) {
      const usersEntities = new Users();
      usersEntities.idProfil = usersDto.idProfil;
      usersEntities.password = usersDto.password;
      usersEntities.name = usersDto.name;
      usersEntities.firstName= usersDto.firstName;
      usersEntities.mail = usersDto.mail;
      usersEntities.numberPhone = usersDto.numberPhone;
      usersEntities.address = usersDto.address;
      usersEntities.instagram = usersDto.instagram;
      usersEntities.facebook = usersDto.facebook;
      usersEntities.description = usersDto.description;
      usersEntities.bank = usersDto.bank;

      const users = this.usersRepository.create(usersEntities);
      await this.usersRepository.save(users);
      return users;
    }

    async update(idProfil : string , data : Partial<Users> ){
      await this.usersRepository.update({idProfil},data);
      const users = this.usersRepository.findOne({where:{idProfil}})
      return users;
    }

    async delete(idProfil : string){
      const users = await this.usersRepository.findOne({where:{idProfil}});
      await this.usersRepository.delete({idProfil});
      return users;
    }
}