import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { token, userId, email } = await this.authService.login(dto);
    this.setCookie(res, token);
    return { userId, email };
  }

  @Post('register')
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const { token, userId, email } = await this.authService.register(dto);
    this.setCookie(res, token);
    return { userId, email };
  }

  @Post('logout')
logout(@Res({ passthrough: true }) res: Response) {
  res.clearCookie('token');
  return { message: 'Logged out' };
}

  private setCookie(res: Response, token: string) {
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
  }
}