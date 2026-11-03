const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const R2_PREFIX = 'https://api-cuacuon.dosutech.site/api/upload/file/assets/';

function convertUrl(url) {
  if (!url) return url;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/assets/')) {
    const filename = url.replace('/assets/', '');
    return `${R2_PREFIX}${filename}`;
  }
  return url;
}

async function main() {
  console.log('--- Migrating Database Image URLs to Cloudflare R2 ---');

  // 1. Update Products
  const products = await prisma.product.findMany();
  console.log(`Found ${products.length} products to update`);
  for (const p of products) {
    const newImages = (p.images || []).map(convertUrl);
    await prisma.product.update({
      where: { id: p.id },
      data: { images: newImages },
    });
    console.log(`Updated product: ${p.name} -> ${newImages[0]}`);
  }

  // 2. Update Articles
  const articleCovers = {
    'quy-trinh-cuu-ho-cua-cuon-24h-ha-noi': `${R2_PREFIX}dv2.jpg`,
    'huong-dan-cach-kiem-tra-va-phong-chong-xo-lo-cua-cuon': `${R2_PREFIX}huong-dan-cach-lap-dat-cua-cuon-khe-thoang-2.jpg`,
    'bang-gia-lap-dat-cua-cuon-phu-kien-2026': `${R2_PREFIX}c5.jpg`,
    'lo-cuon-la-gi-nen-lap-lo-cua-cuon-trong-hay-ngoai': `${R2_PREFIX}lo-cuon-la-gi-nen-lap-lo-cua-cuon-o-trong-nha-hay-ngoai-nha-2.jpg`,
  };

  const articles = await prisma.article.findMany();
  console.log(`Found ${articles.length} articles to update`);
  for (const a of articles) {
    const newCover = articleCovers[a.slug] || convertUrl(a.coverImage) || `${R2_PREFIX}dv2.jpg`;
    await prisma.article.update({
      where: { id: a.id },
      data: { coverImage: newCover },
    });
    console.log(`Updated article: ${a.title} -> ${newCover}`);
  }

  // 3. Update Settings
  const heroSetting = await prisma.setting.findUnique({ where: { key: 'hero_banners' } });
  if (heroSetting && Array.isArray(heroSetting.value)) {
    const updatedBanners = heroSetting.value.map((b) => ({
      ...b,
      image: convertUrl(b.image),
    }));
    await prisma.setting.update({
      where: { key: 'hero_banners' },
      data: { value: updatedBanners },
    });
    console.log('Updated hero_banners setting with R2 URLs');
  }

  const generalSetting = await prisma.setting.findUnique({ where: { key: 'general_config' } });
  if (generalSetting && typeof generalSetting.value === 'object') {
    const updatedConfig = {
      ...generalSetting.value,
      logo: convertUrl(generalSetting.value.logo),
    };
    await prisma.setting.update({
      where: { key: 'general_config' },
      data: { value: updatedConfig },
    });
    console.log('Updated general_config logo with R2 URL');
  }

  console.log('✅ DATABASE SUCCESSFULLY UPDATED TO FULL CLOUDFLARE R2 URLS!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
