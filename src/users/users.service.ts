import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  encrypt = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  };

  compare = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
  };

  async createUser(user: CreateUserDto) {
    const usuario = await this.userRepository.findOne({
      where: { correo: user.correo },
    });

    if (usuario) {
      return {
        message: 'Este correo ya esta registrado',
      };
    }

    const passwordEncrypt = this.encrypt(user.password);

    const newUser = new User();
    newUser.correo = user.correo;
    newUser.usuario = user.usuario;
    newUser.password = (await passwordEncrypt).toString();

    return this.userRepository.save(newUser);
  }

  async findUser(correo: string) {
    return this.userRepository.findOne({where: {correo: correo}})
  }

  async authUser(params) {
    const userData = await this.userRepository.findOne({
      where: { correo: params.correo },
    });

    if (!userData) {
      return { message: 'Credenciales Erroneas' };
    }

    const comparePasswords = await this.compare(
      params.password,
      userData.password,
    );
    // const tokenSession = await tokenSign(userData)

    if (comparePasswords) {
      return userData;
    }

    if (!comparePasswords) {
      return { message: 'Credenciales Erroneas' };
    }
  }
}
