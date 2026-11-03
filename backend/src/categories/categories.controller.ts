import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('api/categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Lấy danh sách danh mục đang hoạt động' })
  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: 'Lấy chi tiết danh mục kèm sản phẩm theo slug' })
  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.categoriesService.findBySlug(slug);
  }

  @ApiOperation({ summary: 'CMS: Lấy toàn bộ danh mục' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('admin')
  async findAllAdmin() {
    return this.categoriesService.findAllAdmin();
  }

  @ApiOperation({ summary: 'CMS: Tạo danh mục mới' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: any) {
    return this.categoriesService.create(body);
  }

  @ApiOperation({ summary: 'CMS: Cập nhật danh mục' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.categoriesService.update(id, body);
  }

  @ApiOperation({ summary: 'CMS: Xóa danh mục' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}

