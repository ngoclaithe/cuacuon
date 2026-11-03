import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug, getSiteSettings } from '@/lib/api';
import SchemaJsonLd from '@/components/SchemaJsonLd';
import { Eye, Calendar, User, ArrowLeft, Phone, Share2, Tag } from 'lucide-react';

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: 'Bài Viết Không Tồn Tại' };
  }

  const title = article.seoTitle || `${article.title} | Cửa Cuốn Thủ Đô`;
  const desc = article.seoDescription || article.excerpt || article.title;

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      type: 'article',
      images: article.coverImage ? [{ url: article.coverImage }] : [],
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const [article, settings] = await Promise.all([
    getArticleBySlug(slug),
    getSiteSettings(),
  ]);

  if (!article) {
    notFound();
  }

  const { general_config } = settings;
  const hotline = general_config?.hotline || '0986 888 121';
  const hotlineClean = hotline.replace(/\s+/g, '');

  const breadcrumbs = [
    { name: 'Trang chủ', url: 'https://cuacuonthudo.com/' },
    { name: 'Cẩm nang', url: 'https://cuacuonthudo.com/tin-tuc' },
    { name: article.title, url: `https://cuacuonthudo.com/tin-tuc/${article.slug}` },
  ];

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <SchemaJsonLd settings={settings} article={article} breadcrumb={breadcrumbs} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <nav className="text-xs text-slate-400 flex items-center space-x-2">
          <Link href="/" className="hover:text-brand-600">Trang chủ</Link>
          <span>/</span>
          <Link href="/tin-tuc" className="hover:text-brand-600">Cẩm nang</Link>
          <span>/</span>
          <span className="text-slate-700 font-bold truncate max-w-xs">{article.title}</span>
        </nav>

        {/* Article Container */}
        <article className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/80 shadow-sm space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider bg-brand-50 px-3 py-1 rounded-full">
              {article.category === 'CUUHO'
                ? 'Cứu Hộ'
                : article.category === 'BAOGIA'
                ? 'Báo Giá'
                : 'Cẩm Nang Kỹ Thuật'}
            </span>

            <h1 className="text-2xl sm:text-4xl font-black text-navy-950 tracking-tight leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 border-b border-slate-100 pb-4">
              <span className="flex items-center space-x-1">
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-slate-700 font-medium">{article.author}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>{article.viewCount} lượt xem</span>
              </span>
            </div>
          </div>

          {/* Excerpt */}
          {article.excerpt && (
            <div className="p-4 rounded-2xl bg-slate-50 border-l-4 border-brand-500 text-slate-700 font-medium text-sm sm:text-base leading-relaxed italic">
              {article.excerpt}
            </div>
          )}

          {/* Featured Image */}
          {article.coverImage && (
            <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-slate-100 shadow-inner">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Body Content */}
          <div
            className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 pt-4"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags && Array.isArray(article.tags) && article.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-slate-400" />
              {article.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Emergency Help Callout Box inside article */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 shadow-lg">
            <div>
              <h3 className="font-bold text-base sm:text-lg">Cửa Cuốn Của Bạn Đang Gặp Sự Cố?</h3>
              <p className="text-xs text-red-100 mt-1">
                Đừng cố tự giật hoặc bấm điều khiển liên tục tránh xô nan nặng hơn. Hãy gọi thợ kỹ thuật hỗ trợ!
              </p>
            </div>
            <a
              href={`tel:${hotlineClean}`}
              className="bg-white text-red-600 font-extrabold px-5 py-3 rounded-xl shadow hover:bg-yellow-100 transition whitespace-nowrap text-sm flex items-center space-x-2"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Gọi Thợ Ngay: {hotline}</span>
            </a>
          </div>
        </article>

        {/* Related Articles */}
        {article.related && article.related.length > 0 && (
          <div className="pt-6">
            <h2 className="text-xl font-bold text-navy-950 mb-4">Bài Viết Liên Quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {article.related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/tin-tuc/${rel.slug}`}
                  className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:shadow-md transition block"
                >
                  <h3 className="font-bold text-slate-900 text-sm line-clamp-2 hover:text-brand-600">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2">Đọc tiếp →</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

