import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ArticlesModule } from './articles/articles.module';
import { QuotesModule } from './quotes/quotes.module';
import { BranchesModule } from './branches/branches.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    PrismaModule,
    AuthModule,
    SettingsModule,
    CategoriesModule,
    ProductsModule,
    ArticlesModule,
    QuotesModule,
    BranchesModule,
    UploadModule,
  ],
})
export class AppModule {}

