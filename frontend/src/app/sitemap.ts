import { MetadataRoute } from 'next';
import { getCategories, getProducts, getArticles } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cuacuonthudo.com';

  const [categories, productsData, articlesData] = await Promise.all([
    getCategories(),
    getProducts({ limit: 100 }),
    getArticles({ limit: 100 }),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/san-pham`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bang-gia`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dich-vu`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tin-tuc`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/lien-he`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Category URLs
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${baseUrl}/san-pham?category=${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Product URLs
  const productRoutes: MetadataRoute.Sitemap = productsData.items.map((p) => ({
    url: `${baseUrl}/san-pham/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Article URLs
  const articleRoutes: MetadataRoute.Sitemap = articlesData.items.map((a) => ({
    url: `${baseUrl}/tin-tuc/${a.slug}`,
    lastModified: new Date(a.createdAt || new Date()),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...articleRoutes];
}

