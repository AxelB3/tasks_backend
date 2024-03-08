import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {
     constructor(private usersService: UsersService, private jwtService: JwtService) {}

     compare = async(password, hashPassword) => {
          return await bcrypt.compare(password, hashPassword)
     }

     async signIn(params, response) {
         
          const user =  await this.usersService.findUser(params.correo)
          
          if (!user) {
               return {message: "Credenciales Erroneas"}
          }

          const comparePasswords = await this.compare(params.password, user.password)
          const payload = {usuario_id: user.id, username: user.usuario}
          
          if (comparePasswords) {
               const token = await this.jwtService.signAsync(payload)
               response.cookie('token', token)
               return {usuario_id: user.id, token: token}
          }

         
          if (!comparePasswords) {
               return {message: "Credenciales Erroneas"}
          }
     }
}
