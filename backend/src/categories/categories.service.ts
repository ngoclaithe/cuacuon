import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
  }

  async findAllAdmin() {
    return this.prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    const cat = await this.prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          where: { inStock: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });
    if (!cat) throw new NotFoundException('Danh mục không tồn tại');
    return cat;
  }

  async create(data: any) {
    return this.prisma.category.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.category.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}

