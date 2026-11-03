import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Đăng nhập trang quản trị CMS' })
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @ApiOperation({ summary: 'Lấy thông tin tài khoản đang đăng nhập' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: any) {
    return this.authService.getProfile(req.user.id);
  }

  @ApiOperation({ summary: 'Đổi mật khẩu tài khoản' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(@Req() req: any, @Body() body: { oldPass: string; newPass: string }) {
    return this.authService.changePassword(req.user.id, body.oldPass, body.newPass);
  }
}

