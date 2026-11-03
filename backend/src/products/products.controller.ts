import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('api/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: 'Lấy danh sách sản phẩm (có lọc, phân trang, tìm kiếm)' })
  @ApiQuery({ name: 'categorySlug', required: false })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'isFeatured', required: false, type: Boolean })
  @ApiQuery({ name: 'isHot', required: false, type: Boolean })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @Get()
  async findAll(
    @Query('categorySlug') categorySlug?: string,
    @Query('categoryId') categoryId?: string,
    @Query('search') search?: string,
    @Query('isFeatured') isFeatured?: string,
    @Query('isHot') isHot?: string,
    @Query('limit') limit?: string,
    @Query('page') page?: string,
  ) {
    return this.productsService.findAll({
      categorySlug,
      categoryId,
      search,
      isFeatured: isFeatured !== undefined ? isFeatured === 'true' : undefined,
      isHot: isHot !== undefined ? isHot === 'true' : undefined,
      limit: limit ? parseInt(limit, 10) : 20,
      page: page ? parseInt(page, 10) : 1,
    });
  }

  @ApiOperation({ summary: 'Lấy chi tiết sản phẩm theo slug (kèm sản phẩm liên quan)' })
  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @ApiOperation({ summary: 'Lấy chi tiết sản phẩm theo ID' })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @ApiOperation({ summary: 'CMS: Tạo sản phẩm mới' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: any) {
    return this.productsService.create(body);
  }

  @ApiOperation({ summary: 'CMS: Cập nhật sản phẩm' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.productsService.update(id, body);
  }

  @ApiOperation({ summary: 'CMS: Xóa sản phẩm' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}

