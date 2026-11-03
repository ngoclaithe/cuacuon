import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Branches')
@Controller('api/branches')
export class BranchesController {
  constructor(private branchesService: BranchesService) {}

  @ApiOperation({ summary: 'Lấy danh sách các cơ sở cứu hộ tại Hà Nội' })
  @Get()
  async findAll() {
    return this.branchesService.findAll();
  }

  @ApiOperation({ summary: 'CMS: Tạo cơ sở mới' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: any) {
    return this.branchesService.create(body);
  }

  @ApiOperation({ summary: 'CMS: Cập nhật cơ sở' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.branchesService.update(id, body);
  }

  @ApiOperation({ summary: 'CMS: Xóa cơ sở' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.branchesService.remove(id);
  }
}

