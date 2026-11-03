import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('Quotes & Leads')
@Controller('api/quotes')
export class QuotesController {
  constructor(private quotesService: QuotesService) {}

  @ApiOperation({ summary: 'Khách hàng gửi yêu cầu cứu hộ hoặc nhận báo giá' })
  @Post()
  async create(@Body() body: any) {
    return this.quotesService.create(body);
  }

  @ApiOperation({ summary: 'CMS: Lấy thống kê số lượng yêu cầu cứu hộ / báo giá' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('stats')
  async getStats() {
    return this.quotesService.getStats();
  }

  @ApiOperation({ summary: 'CMS: Lấy danh sách yêu cầu (lọc theo trạng thái)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get()
  async findAll(
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.quotesService.findAll({
      status,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
    });
  }

  @ApiOperation({ summary: 'CMS: Cập nhật trạng thái xử lý & ghi chú nội bộ' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string; adminNote?: string },
  ) {
    return this.quotesService.updateStatus(id, body.status, body.adminNote);
  }

  @ApiOperation({ summary: 'CMS: Xóa yêu cầu' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.quotesService.remove(id);
  }
}

