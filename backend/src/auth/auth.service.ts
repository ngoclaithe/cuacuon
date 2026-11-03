import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác');
    }
    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác');
    }
    return user;
  }

  async login(email: string, pass: string) {
    const user = await this.validateUser(email, pass);
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async getProfile(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
  }

  async changePassword(userId: string, oldPass: string, newPass: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new BadRequestException('Người dùng không tồn tại');
    const isMatch = await bcrypt.compare(oldPass, user.passwordHash);
    if (!isMatch) throw new BadRequestException('Mật khẩu hiện tại không đúng');

    const passwordHash = await bcrypt.hash(newPass, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });
    return { message: 'Đổi mật khẩu thành công' };
  }
}

