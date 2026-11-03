import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('Articles')
@Controller('api/articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @ApiOperation({ summary: 'Lấy danh sách tin tức / bài viết (phân trang, lọc danh mục)' })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @Get()
  async findAll(
    @Query('category') category?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.articlesService.findAll({
      category,
      search,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
      onlyPublished: true,
    });
  }

  @ApiOperation({ summary: 'CMS: Lấy toàn bộ bài viết kể cả chưa đăng' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('admin')
  async findAllAdmin(
    @Query('category') category?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.articlesService.findAll({
      category,
      search,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
      onlyPublished: false,
    });
  }

  @ApiOperation({ summary: 'Lấy chi tiết bài viết theo slug' })
  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.articlesService.findBySlug(slug);
  }

  @ApiOperation({ summary: 'CMS: Tạo bài viết mới' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: any) {
    return this.articlesService.create(body);
  }

  @ApiOperation({ summary: 'CMS: Cập nhật bài viết' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.articlesService.update(id, body);
  }

  @ApiOperation({ summary: 'CMS: Xóa bài viết' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}

