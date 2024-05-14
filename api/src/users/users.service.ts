import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { UsersDto } from './dto/users.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService{
    constructor(
      @InjectRepository(Users)
      private readonly usersRepository: Repository<Users>,
    ) {}

    async findAll(): Promise<Users[]> {
      return await this.usersRepository.find();
    }

    async read(idProfil: number): Promise<Users>{
      return await this.usersRepository.findOne({
        where: {
          idProfil,
        }
      });
    }

    async readOnUsername(username: string): Promise<Users>{
      return await this.usersRepository.findOne({
        where: {
          username,
        }
      });
    }

    async create(usersDto : UsersDto) {
      //const salt = await bcrypt.genSalt();
      const salt = 10;
      const usersEntities = new Users();
      usersEntities.idProfil = usersDto.idProfil;
      usersEntities.username = usersDto.username;
      //usersEntities.password = usersDto.password;
      usersEntities.password = await bcrypt.hash(usersDto.password,salt);
      usersEntities.name = usersDto.name;
      usersEntities.firstName= usersDto.firstName;
      usersEntities.mail = usersDto.mail;
      usersEntities.numberPhone = usersDto.numberPhone;
      usersEntities.address = usersDto.address;
      usersEntities.instagram = usersDto.instagram;
      usersEntities.facebook = usersDto.facebook;
      usersEntities.description = usersDto.description;

      const users = this.usersRepository.create(usersEntities);
      await this.usersRepository.save(users);
      return users;
    }

    async update(idProfil : number , data : Partial<Users> ){
      await this.usersRepository.update({idProfil},data);
      const users = this.usersRepository.findOne({where:{idProfil}})
      return users;
    }

    async delete(idProfil : number){
      const users = await this.usersRepository.findOne({where:{idProfil}});
      await this.usersRepository.delete({idProfil});
      return users;
    }

    async getUsersRelations() {
      return this.usersRepository.createQueryBuilder('users')
        .leftJoinAndSelect('users.usersRelations', 'usersRelations')
        .getMany();
    }
}