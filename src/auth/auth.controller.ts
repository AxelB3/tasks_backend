import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>, @Res({ passthrough: true }) response: Response){
    return this.authService.signIn(signInDto, response);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req){
    return req.user
  }
}
