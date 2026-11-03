import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Settings')
@Controller('api/settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @ApiOperation({ summary: 'Lấy toàn bộ settings cho Next.js Website SSR/CSR' })
  @Get('public')
  async getPublicSettings() {
    return this.settingsService.getPublicSettings();
  }

  @ApiOperation({ summary: 'Lấy danh sách tất cả setting items' })
  @Get()
  async getAll() {
    return this.settingsService.getAll();
  }

  @ApiOperation({ summary: 'Lấy chi tiết 1 setting theo key' })
  @Get(':key')
  async getByKey(@Param('key') key: string) {
    return this.settingsService.getByKey(key);
  }

  @ApiOperation({ summary: 'Cập nhật 1 setting theo key' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':key')
  async updateByKey(
    @Param('key') key: string,
    @Body() body: { value: any; description?: string },
  ) {
    return this.settingsService.updateByKey(key, body.value, body.description);
  }

  @ApiOperation({ summary: 'Cập nhật hàng loạt settings cho CMS' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put()
  async bulkUpdate(@Body() body: Record<string, any>) {
    return this.settingsService.bulkUpdate(body);
  }
}

