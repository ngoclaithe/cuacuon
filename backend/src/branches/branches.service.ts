import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BranchesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.branch.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  }

  async create(data: any) {
    return this.prisma.branch.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.branch.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.branch.delete({ where: { id } });
  }
}

