import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly publicUrl: string;

  constructor(private configService: ConfigService) {
    const accountId = this.configService.get<string>('R2_ACCOUNT_ID') || '11999a32009c0a6d99dbe127b87283e6';
    const accessKeyId = this.configService.get<string>('R2_ACCESS_KEY_ID') || 'c5c90c5e98f22cba70c1e37c80e841f4';
    const secretAccessKey = this.configService.get<string>('R2_SECRET_ACCESS_KEY') || 'd2fbf657defbd1907856fa77dadd89d05067a3e2fb7fd2fe599c260d8e6b65a1';
    const endpoint = this.configService.get<string>('R2_ENDPOINT') || `https://${accountId}.r2.cloudflarestorage.com`;
    this.bucketName = this.configService.get<string>('R2_BUCKET_NAME') || 'cuacuon';
    this.publicUrl = this.configService.get<string>('R2_PUBLIC_URL') || '';

    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    this.logger.log(`Cloudflare R2 Upload Service initialized for bucket: ${this.bucketName}`);
  }

  async uploadFile(file: Express.Multer.File, folder: string = 'uploads') {
    const timestamp = Date.now();
    const random = Math.round(Math.random() * 1e6);
    const cleanName = file.originalname
      .toLowerCase()
      .replace(/[^a-z0-9.]/g, '-')
      .replace(/-+/g, '-');
    const key = `${folder}/${timestamp}-${random}-${cleanName}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    // If R2_PUBLIC_URL is provided (e.g. custom domain or r2.dev), use that.
    // Otherwise fallback to backend proxy url /api/upload/file/${key}
    const url = this.publicUrl
      ? `${this.publicUrl.replace(/\/+$/, '')}/${key}`
      : `/api/upload/file/${key}`;

    return {
      url,
      key,
      filename: `${timestamp}-${random}-${cleanName}`,
      size: file.size,
      mimetype: file.mimetype,
    };
  }

  async getFileObject(key: string) {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });
      const response = await this.s3Client.send(command);
      return {
        stream: response.Body as Readable,
        contentType: response.ContentType || 'application/octet-stream',
        contentLength: response.ContentLength,
      };
    } catch (err: any) {
      this.logger.error(`Error fetching key ${key} from R2: ${err.message}`);
      throw new NotFoundException(`File not found: ${key}`);
    }
  }
}
