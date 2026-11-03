import type { Metadata } from 'next';
import './globals.css';
import { getSiteSettings, getCategories, getBranches } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import SchemaJsonLd from '@/components/SchemaJsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const { seo_config, general_config } = settings;

  const siteTitle = seo_config?.metaTitle || 'Cửa Cuốn Thủ Đô | Cứu Hộ Cửa Cuốn Hà Nội 24/7 Có Mặt Sau 15 Phút';
  const siteDesc = seo_config?.metaDescription || 'Cửa cuốn Thủ Đô chuyên cứu hộ sửa chữa cửa cuốn khẩn cấp 24/24 tại Hà Nội.';

  return {
    metadataBase: new URL('https://cuacuonthudo.com'),
    title: {
      default: siteTitle,
      template: '%s | Cửa Cuốn Thủ Đô',
    },
    description: siteDesc,
    keywords: seo_config?.metaKeywords || 'cửa cuốn hà nội, cứu hộ cửa cuốn 24h, austdoor',
    authors: [{ name: 'Cửa Cuốn Thủ Đô', url: 'https://cuacuonthudo.com' }],
    creator: 'Cửa Cuốn Thủ Đô',
    publisher: 'Cửa Cuốn Thủ Đô',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: siteTitle,
      description: siteDesc,
      url: 'https://cuacuonthudo.com',
      siteName: general_config?.siteName || 'Cửa Cuốn Thủ Đô',
      locale: 'vi_VN',
      type: 'website',
      images: [
        {
          url: seo_config?.ogImage || '/assets/Slide2-1894x708-1.jpg',
          width: 1200,
          height: 630,
          alt: siteTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDesc,
      images: [seo_config?.ogImage || '/assets/Slide2-1894x708-1.jpg'],
    },
    alternates: {
      canonical: 'https://cuacuonthudo.com',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, categories, branches] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getBranches(),
  ]);

  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased text-slate-800 bg-slate-50 selection:bg-brand-500 selection:text-white">
        <SchemaJsonLd settings={settings} />
        <Header settings={settings} categories={categories} />
        <main className="flex-1">{children}</main>
        <FloatingContact settings={settings} />
        <Footer settings={settings} branches={branches} />
      </body>
    </html>
  );
}
