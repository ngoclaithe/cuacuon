import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getCategories, getProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import { Layers, Search, Filter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sản Phẩm Cửa Cuốn Chính Hãng Austdoor | Bảng Giá Đại Lý',
  description: 'Tổng hợp các mẫu cửa cuốn khe thoáng, cửa cuốn tấm liền, khớp inox và phụ kiện motor, bình lưu điện chính hãng Austdoor tại Cửa Cuốn Thủ Đô.',
  keywords: 'cửa cuốn austdoor, cửa cuốn khe thoáng, cửa cuốn tấm liền, motor cửa cuốn',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams.category || '';
  const currentSearch = resolvedParams.search || '';

  const [categories, productsData] = await Promise.all([
    getCategories(),
    getProducts({
      categorySlug: currentCategory || undefined,
      search: currentSearch || undefined,
      limit: 24,
    }),
  ]);

  const activeCategory = categories.find((c) => c.slug === currentCategory);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Banner */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm mb-10">
          <nav className="text-xs text-slate-400 mb-3 flex items-center space-x-2">
            <Link href="/" className="hover:text-brand-600">Trang chủ</Link>
            <span>/</span>
            <span className="text-slate-700 font-semibold">Sản phẩm</span>
            {activeCategory && (
              <>
                <span>/</span>
                <span className="text-brand-600 font-bold">{activeCategory.name}</span>
              </>
            )}
          </nav>

          <h1 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
            {activeCategory ? activeCategory.name : 'Tất Cả Sản Phẩm Cửa Cuốn'}
          </h1>
          <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-3xl">
            {activeCategory?.description ||
              'Cung cấp các dòng cửa cuốn cao cấp: cửa cuốn nan nhôm khe thoáng Austdoor, cửa tấm liền công nghệ Úc, cửa khớp Inox và phụ kiện mô tơ đồng bộ chất lượng số 1 thị trường.'}
          </p>

          {/* Search bar inside header */}
          <form method="GET" action="/san-pham" className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                name="search"
                defaultValue={currentSearch}
                placeholder="Tìm kiếm mã cửa (A50, C70, S52i, motor...)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
            {currentCategory && <input type="hidden" name="category" value={currentCategory} />}
            <button
              type="submit"
              className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl transition shadow"
            >
              Tìm Kiếm
            </button>
          </form>
        </div>

        {/* Categories Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <Link
            href="/san-pham"
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              !currentCategory
                ? 'bg-brand-600 text-white shadow'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Tất Cả ({productsData.total})
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/san-pham?category=${cat.slug}`}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                currentCategory === cat.slug
                  ? 'bg-brand-600 text-white shadow'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Product Grid */}
        {productsData.items.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200">
            <Layers className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800">Không tìm thấy sản phẩm nào</h3>
            <p className="text-slate-500 text-sm mt-1">Vui lòng thử tìm kiếm với từ khóa khác.</p>
            <Link
              href="/san-pham"
              className="mt-4 inline-block px-4 py-2 bg-brand-600 text-white text-xs font-bold rounded-xl"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsData.items.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

