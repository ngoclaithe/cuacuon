import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.setting.findMany();
  }

  async getPublicSettings() {
    const list = await this.prisma.setting.findMany();
    const result: Record<string, any> = {};
    for (const item of list) {
      result[item.key] = item.value;
    }
    return result;
  }

  async getByKey(key: string) {
    const item = await this.prisma.setting.findUnique({ where: { key } });
    if (!item) {
      throw new NotFoundException(`Cấu hình với key "${key}" không tồn tại`);
    }
    return item;
  }

  async updateByKey(key: string, value: any, description?: string) {
    return this.prisma.setting.upsert({
      where: { key },
      update: {
        value,
        ...(description ? { description } : {}),
      },
      create: {
        key,
        value,
        description: description || 'Cấu hình hệ thống',
      },
    });
  }

  async bulkUpdate(settings: Record<string, any>) {
    const promises = Object.entries(settings).map(([key, value]) =>
      this.prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      }),
    );
    await Promise.all(promises);
    return this.getPublicSettings();
  }
}

