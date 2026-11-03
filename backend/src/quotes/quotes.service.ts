import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuotesService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    customerName: string;
    phone: string;
    address?: string;
    serviceType: string;
    doorType?: string;
    width?: number;
    height?: number;
    estimatedPrice?: number;
    notes?: string;
  }) {
    if (!data.customerName || !data.phone) {
      throw new BadRequestException('Họ tên và số điện thoại là bắt buộc');
    }

    return this.prisma.quoteRequest.create({
      data: {
        customerName: data.customerName,
        phone: data.phone,
        address: data.address,
        serviceType: data.serviceType || 'BAO_GIA_LAP_MOI',
        doorType: data.doorType,
        width: data.width ? Number(data.width) : undefined,
        height: data.height ? Number(data.height) : undefined,
        estimatedPrice: data.estimatedPrice ? Number(data.estimatedPrice) : undefined,
        notes: data.notes,
        status: 'PENDING',
      },
    });
  }

  async findAll(params: { status?: string; page?: number; limit?: number }) {
    const { status, page = 1, limit = 20 } = params;
    const skip = (page - 1) * limit;
    const where: any = {};
    if (status) {
      where.status = status;
    }

    const [items, total] = await Promise.all([
      this.prisma.quoteRequest.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.quoteRequest.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async updateStatus(id: string, status: string, adminNote?: string) {
    return this.prisma.quoteRequest.update({
      where: { id },
      data: {
        status,
        ...(adminNote !== undefined ? { adminNote } : {}),
      },
    });
  }

  async getStats() {
    const [total, pending, contacted, completed] = await Promise.all([
      this.prisma.quoteRequest.count(),
      this.prisma.quoteRequest.count({ where: { status: 'PENDING' } }),
      this.prisma.quoteRequest.count({ where: { status: 'CONTACTED' } }),
      this.prisma.quoteRequest.count({ where: { status: 'COMPLETED' } }),
    ]);

    return { total, pending, contacted, completed };
  }

  async remove(id: string) {
    return this.prisma.quoteRequest.delete({ where: { id } });
  }
}

