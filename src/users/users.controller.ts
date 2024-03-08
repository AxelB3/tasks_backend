import { Controller, Post, Body, Get, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
     constructor(private usersService: UsersService) {}

     @Post('crear')
     createTask(@Body() newUser: CreateUserDto){
          return this.usersService.createUser(newUser)
     }

     @Post('auth')
     authUser(@Body() params){
          return this.usersService.authUser(params)
     }



}
