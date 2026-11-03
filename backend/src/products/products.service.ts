import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    categorySlug?: string;
    categoryId?: string;
    search?: string;
    isFeatured?: boolean;
    isHot?: boolean;
    limit?: number;
    page?: number;
  }) {
    const { categorySlug, categoryId, search, isFeatured, isHot, limit = 20, page = 1 } = params;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (categoryId) {
      where.categoryId = categoryId;
    } else if (categorySlug) {
      where.category = { slug: categorySlug };
    }

    if (isFeatured !== undefined) {
      where.isFeatured = isFeatured;
    }

    if (isHot !== undefined) {
      where.isHot = isHot;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          category: {
            select: { id: true, name: true, slug: true },
          },
        },
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Sản phẩm "${slug}" không tồn tại`);
    }

    // Related products for SEO and cross-selling
    const related = await this.prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        id: { not: product.id },
      },
      take: 4,
      orderBy: { sortOrder: 'asc' },
    });

    return {
      ...product,
      related,
    };
  }

  async findById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!product) throw new NotFoundException('Sản phẩm không tồn tại');
    return product;
  }

  async create(data: any) {
    return this.prisma.product.create({
      data,
      include: { category: true },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.product.update({
      where: { id },
      data,
      include: { category: true },
    });
  }

  async remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}

