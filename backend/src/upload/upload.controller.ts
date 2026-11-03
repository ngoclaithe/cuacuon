import {
  Controller,
  Post,
  Get,
  Param,
  Res,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { UploadService } from './upload.service';

@ApiTags('Upload')
@Controller('api/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({ summary: 'Upload file hình ảnh lên Cloudflare R2' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp|svg\+xml)$/)) {
          return cb(
            new BadRequestException('Chỉ chấp nhận file hình ảnh (jpg, png, webp, svg)'),
            false,
          );
        }
        cb(null, true);
      },
      limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Vui lòng chọn file để upload');
    }
    return await this.uploadService.uploadFile(file);
  }

  @ApiOperation({ summary: 'Proxy stream file từ Cloudflare R2' })
  @Get('file/*')
  async getFile(@Param() params: Record<string, string>, @Res() res: Response) {
    const key = params['0'];
    if (!key) {
      throw new BadRequestException('Key file không hợp lệ');
    }

    const { stream, contentType, contentLength } = await this.uploadService.getFileObject(key);
    res.setHeader('Content-Type', contentType);
    if (contentLength) {
      res.setHeader('Content-Length', contentLength);
    }
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    stream.pipe(res);
  }
}
