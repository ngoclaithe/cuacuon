import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getSiteSettings } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import SchemaJsonLd from '@/components/SchemaJsonLd';
import {
  Phone,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  Clock,
  ArrowRight,
  Share2,
  FileText,
  Sparkles,
} from 'lucide-react';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Sản Phẩm Không Tồn Tại',
    };
  }

  const title = product.seoTitle || `${product.name} | Cửa Cuốn Thủ Đô`;
  const desc = product.seoDescription || product.description || `Chi tiết thông số kỹ thuật và báo giá ${product.name}.`;

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const [product, settings] = await Promise.all([
    getProductBySlug(slug),
    getSiteSettings(),
  ]);

  if (!product) {
    notFound();
  }

  const { general_config } = settings;
  const hotline = general_config?.hotline || '0986 888 121';
  const hotlineClean = hotline.replace(/\s+/g, '');

  const breadcrumbs = [
    { name: 'Trang chủ', url: 'https://cuacuonthudo.com/' },
    { name: 'Sản phẩm', url: 'https://cuacuonthudo.com/san-pham' },
    { name: product.name, url: `https://cuacuonthudo.com/san-pham/${product.slug}` },
  ];

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <SchemaJsonLd settings={settings} product={product} breadcrumb={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-slate-400 flex items-center space-x-2">
          <Link href="/" className="hover:text-brand-600">Trang chủ</Link>
          <span>/</span>
          <Link href="/san-pham" className="hover:text-brand-600">Sản phẩm</Link>
          {product.category && (
            <>
              <span>/</span>
              <Link href={`/san-pham?category=${product.category.slug}`} className="hover:text-brand-600">
                {product.category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-slate-700 font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Hero Info */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Gallery Images */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner relative">
              <img
                src={product.images?.[0] || '/assets/cua-cuon-khe-thoang-AD-E51i.webp'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail preview list */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] rounded-xl overflow-hidden border-2 border-brand-500 bg-slate-50"
                  >
                    <img src={img} alt={`${product.name} ảnh ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Core Info & CTA */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {product.category && (
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wider bg-brand-50 px-3 py-1 rounded-full">
                  {product.category.name}
                </span>
              )}

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-950 tracking-tight mt-3">
                {product.name}
              </h1>

              {product.code && (
                <div className="text-xs text-slate-500 mt-1">
                  Mã sản phẩm: <strong className="text-slate-800">{product.code}</strong>
                </div>
              )}

              {/* Price card */}
              <div className="mt-5 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-semibold block">Đơn giá tham khảo:</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-black text-brand-600">
                      {(product.salePrice || product.price || 0).toLocaleString('vi-VN')} đ
                    </span>
                    <span className="text-sm text-slate-500 font-medium">/{product.unit}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center space-x-1 text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-md">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Bảo hành {product.warrantyMonths}T</span>
                  </span>
                </div>
              </div>

              {/* Key Features Bullet Points */}
              {product.features && Array.isArray(product.features) && (
                <div className="mt-6 space-y-2.5">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Ưu Điểm Vượt Trội:
                  </span>
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA action buttons */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${hotlineClean}`}
                  className="py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-lg flex items-center justify-center space-x-2 group"
                >
                  <Phone className="w-4 h-4 fill-current group-hover:rotate-12 transition-transform" />
                  <span>Gọi Tư Vấn: {hotline}</span>
                </a>

                <a
                  href="/#calculator"
                  className="py-3.5 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Dự Toán Chi Phí Ngay</span>
                </a>
              </div>

              <p className="text-[11px] text-slate-500 text-center">
                * Miễn phí 100% chi phí đo đạc, khảo sát mặt bằng và mang mẫu nan tận nhà tại Hà Nội.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Specs & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content & Specs Table */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-8">
            {/* Specs Table */}
            {product.specs && typeof product.specs === 'object' && (
              <div>
                <h2 className="text-xl font-bold text-navy-950 mb-4 flex items-center space-x-2 border-l-4 border-brand-500 pl-3">
                  <span>Thông Số Kỹ Thuật Chi Tiết</span>
                </h2>
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <table className="w-full text-xs sm:text-sm text-left">
                    <tbody>
                      {Object.entries(product.specs).map(([k, v], i) => (
                        <tr key={k} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                          <td className="py-3 px-4 font-semibold text-slate-600 w-1/3 border-b border-slate-100">
                            {k}
                          </td>
                          <td className="py-3 px-4 text-slate-900 font-bold border-b border-slate-100">
                            {String(v)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Detailed Description */}
            {product.content && (
              <div>
                <h2 className="text-xl font-bold text-navy-950 mb-4 border-l-4 border-brand-500 pl-3">
                  Mô Tả Sản Phẩm & Tính Năng
                </h2>
                <div
                  className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4"
                  dangerouslySetInnerHTML={{ __html: product.content }}
                />
              </div>
            )}
          </div>

          {/* Right Sidebar: Service Commitments */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
                Chính Sách Cam Kết
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start space-x-2">
                  <ShieldCheck className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>100% Sản phẩm chính hãng có tem Austdoor</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Clock className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <span>Lắp đặt nhanh chóng, bàn giao đúng tiến độ</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Wrench className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Cứu hộ khẩn cấp 24/24 sau 15 phút</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                  <span>Bảo hành điện tử chính hãng từ 24 - 36 tháng</span>
                </li>
              </ul>
            </div>

            {/* Quick Contact Card */}
            <div className="bg-gradient-to-br from-navy-900 to-slate-950 text-white rounded-3xl p-6 shadow-xl space-y-4">
              <span className="text-xs uppercase font-extrabold text-brand-400 tracking-wider">
                Cần Khảo Sát Tận Nhà?
              </span>
              <h4 className="text-lg font-black leading-snug">
                Mang Mẫu Nan Cửa Cuốn Thực Tế Đến Tận Công Trình
              </h4>
              <p className="text-xs text-slate-300">
                Đội kỹ thuật viên sẽ mang đầy đủ mẫu nan nhôm mẫu, tư vấn phong thủy và đo đạc miễn phí.
              </p>
              <a
                href={`tel:${hotlineClean}`}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl text-center text-sm shadow flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Gọi Ngay: {hotline}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {product.related && product.related.length > 0 && (
          <div className="pt-8">
            <h2 className="text-2xl font-black text-navy-950 mb-6">Sản Phẩm Tương Tự</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.related.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

