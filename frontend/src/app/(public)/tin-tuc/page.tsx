import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getArticles } from '@/lib/api';
import { Eye, Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cẩm Nang & Kinh Nghiệm Cửa Cuốn | Cửa Cuốn Thủ Đô',
  description: 'Tổng hợp các bài viết hướng dẫn sử dụng, bảo dưỡng, phòng chống xô lô và cẩm nang kỹ thuật cửa cuốn hữu ích từ Cửa Cuốn Thủ Đô.',
  keywords: 'kinh nghiệm cửa cuốn, cách sửa cửa cuốn, lô cuốn là gì, phòng chống kẹt cửa',
};

export default async function ArticlesPage() {
  const articlesData = await getArticles({ limit: 12 });

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center space-x-1.5 bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kiến Thức & Kinh Nghiệm</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
            Cẩm Nang Cửa Cuốn Thủ Đô
          </h1>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Tổng hợp chia sẻ từ các chuyên gia kỹ thuật hàng đầu giúp bạn sử dụng cửa cuốn an toàn,
            bền bỉ và phòng ngừa tối đa các sự cố nguy hiểm.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesData.items.map((art) => (
            <article
              key={art.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                  <img
                    src={art.coverImage || '/assets/dv2.jpg'}
                    alt={art.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-brand-600 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow">
                    {art.category === 'CUUHO'
                      ? 'Cứu Hộ'
                      : art.category === 'BAOGIA'
                      ? 'Báo Giá'
                      : 'Kiến Thức'}
                  </span>
                </div>

                <div className="p-6">
                  <h2 className="font-extrabold text-slate-900 text-base sm:text-lg hover:text-brand-600 transition line-clamp-2">
                    <Link href={`/tin-tuc/${art.slug}`}>{art.title}</Link>
                  </h2>
                  {art.excerpt && (
                    <p className="text-xs sm:text-sm text-slate-500 line-clamp-3 mt-2.5 leading-relaxed">
                      {art.excerpt}
                    </p>
                  )}
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center space-x-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{art.viewCount} xem</span>
                </span>
                <Link
                  href={`/tin-tuc/${art.slug}`}
                  className="font-bold text-brand-600 hover:text-brand-700 flex items-center space-x-1"
                >
                  <span>Đọc bài viết</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

