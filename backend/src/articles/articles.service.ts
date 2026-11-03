import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
    onlyPublished?: boolean;
  }) {
    const { category, search, page = 1, limit = 10, onlyPublished = true } = params;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (onlyPublished) {
      where.isPublished = true;
    }
    if (category) {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.article.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.article.count({ where }),
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
    const article = await this.prisma.article.findUnique({
      where: { slug },
    });
    if (!article) {
      throw new NotFoundException(`Bài viết "${slug}" không tồn tại`);
    }

    // Increment view count asynchronously
    await this.prisma.article.update({
      where: { id: article.id },
      data: { viewCount: { increment: 1 } },
    });

    const related = await this.prisma.article.findMany({
      where: {
        category: article.category,
        id: { not: article.id },
        isPublished: true,
      },
      take: 3,
      orderBy: { createdAt: 'desc' },
    });

    return { ...article, viewCount: article.viewCount + 1, related };
  }

  async create(data: any) {
    return this.prisma.article.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.article.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.article.delete({ where: { id } });
  }
}

