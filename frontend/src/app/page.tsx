import React from 'react';
import Link from 'next/link';
import {
  getSiteSettings,
  getCategories,
  getProducts,
  getArticles,
  getBranches,
} from '@/lib/api';
import HeroSlider from '@/components/HeroSlider';
import PriceCalculator from '@/components/Calculator';
import ProductCard from '@/components/ProductCard';
import {
  Phone,
  ShieldCheck,
  Clock,
  Wrench,
  CheckCircle,
  Award,
  ArrowRight,
  ShieldAlert,
  MapPin,
  Eye,
  Sparkles,
  PhoneCall,
  MessageSquare,
} from 'lucide-react';

export default async function HomePage() {
  const [settings, categories, productsData, articlesData, branches] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getProducts({ limit: 8, isFeatured: true }),
    getArticles({ limit: 4 }),
    getBranches(),
  ]);

  const { general_config } = settings;
  const hotline = general_config?.hotline || '0986 888 121';
  const hotlineClean = hotline.replace(/\s+/g, '');

  return (
    <div className="space-y-16 sm:space-y-20 bg-slate-50">
      {/* 1. Hero Banner Slider */}
      <HeroSlider settings={settings} />

      {/* 2. Professional Rescue Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center space-x-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 font-semibold text-xs uppercase px-3 py-1 rounded-full mb-3">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Dịch vụ cứu hộ khẩn cấp 24/24</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Cửa cuốn gặp sự cố? Có mặt sau 15 phút
            </h2>
            <p className="mt-3 text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              Đội thợ cơ động tại 12 quận nội thành Hà Nội xử lý dứt điểm các lỗi kẹt nan,
              đứt cót lò xo, hỏng motor, mất chìa khóa, cửa trôi phanh.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Step 1 */}
            <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 font-mono font-bold text-sm flex items-center justify-center mb-4 border border-orange-500/20">
                01
              </div>
              <h3 className="font-bold text-base text-white mb-1.5">Tiếp nhận yêu cầu</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tổng đài tiếp nhận thông tin và điều phối kỹ thuật viên gần nhất đang túc trực tại địa bàn của bạn.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 font-mono font-bold text-sm flex items-center justify-center mb-4 border border-orange-500/20">
                02
              </div>
              <h3 className="font-bold text-base text-white mb-1.5">Có mặt sau 15 phút</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kỹ thuật viên di chuyển xe máy chuyên dụng, trang bị đầy đủ dụng cụ và linh kiện thay thế chính hãng.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 font-mono font-bold text-sm flex items-center justify-center mb-4 border border-orange-500/20">
                03
              </div>
              <h3 className="font-bold text-base text-white mb-1.5">Báo giá minh bạch</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Khảo sát nguyên nhân, giải thích phương án kỹ thuật và báo giá niêm yết trước khi tiến hành sửa.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 font-mono font-bold text-sm flex items-center justify-center mb-4 border border-orange-500/20">
                04
              </div>
              <h3 className="font-bold text-base text-white mb-1.5">Nghiệm thu & bàn giao</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Vận hành thử nghiệm mượt mà, dán tem bảo hành và viết phiếu bàn giao rõ ràng cho gia chủ.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href={`tel:${hotlineClean}`}
              className="inline-flex items-center space-x-2 bg-orange-600 hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-lg transition"
            >
              <Phone className="w-4 h-4" />
              <span>Gọi thợ cứu hộ: {hotline}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. Featured Products Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-orange-50 text-orange-700 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sản phẩm tiêu biểu</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Cửa cuốn Austdoor chính hãng đồng bộ
            </h2>
            <p className="mt-1 text-slate-600 text-xs sm:text-sm">
              Nan nhôm hợp kim AL6063 T5 độ bền trên 25 năm, vận hành siêu êm và tích hợp công nghệ chống sao chép ARC.
            </p>
          </div>

          <Link
            href="/san-pham"
            className="mt-3 md:mt-0 inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-orange-600 hover:text-orange-700 hover:underline"
          >
            <span>Xem tất cả sản phẩm</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <Link
            href="/san-pham"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white whitespace-nowrap shadow-sm"
          >
            Tất cả ({productsData.total})
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/san-pham?category=${cat.slug}`}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 whitespace-nowrap transition"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsData.items.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 4. Interactive Calculator Component */}
      <PriceCalculator />

      {/* 5. Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center space-x-1.5 bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            <Award className="w-3.5 h-3.5 text-orange-600" />
            <span>Cam kết dịch vụ</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Vì sao khách hàng tin chọn Thủ Đô Door?
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm">
            Hơn 12 năm xây dựng niềm tin bằng sự minh bạch, chuẩn xác và trách nhiệm với mọi công trình.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">100% linh kiện chính hãng</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Toàn bộ nan cửa, mô tơ, hộp điều khiển và bình lưu điện đều có tem bảo hành điện tử chính hãng từ Austdoor và Doortech.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-5">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Cứu hộ có mặt sau 15 phút</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Mạng lưới cơ sở phân bổ đều khắp 12 quận Hà Nội giúp kỹ thuật viên tiếp cận nhanh nhất, sẵn sàng phục vụ 24/24.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-5">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Giá niêm yết minh bạch</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Khảo sát báo giá công khai trước khi làm. Tuyệt đối không có tình trạng phát sinh chi phí hay tăng giá ban đêm.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Real Projects Showcase */}
      <section className="bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-orange-400 font-semibold text-xs uppercase tracking-wider">
                Hình ảnh thực tế
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
                Công trình tiêu biểu đã hoàn thiện
              </h2>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md mt-2 md:mt-0">
              Hơn 25.000 bộ cửa cuốn đã được lắp đặt an toàn cho các biệt thự, nhà phố và showroom tại Hà Nội.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-800 relative">
              <img
                src="/assets/c2.jpg"
                alt="Công trình cửa cuốn biệt thự"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-5">
                <span className="text-orange-400 text-[10px] font-bold uppercase">Biệt thự cao cấp</span>
                <h4 className="text-white font-bold text-sm mt-0.5">Cửa cuốn Austdoor C70 siêu thoáng - Vinhomes</h4>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-800 relative">
              <img
                src="/assets/c3.jpg"
                alt="Lắp đặt cửa cuốn nhà phố hiện đại"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-5">
                <span className="text-orange-400 text-[10px] font-bold uppercase">Nhà phố mặt tiền</span>
                <h4 className="text-white font-bold text-sm mt-0.5">Cửa cuốn nan nhôm khe thoáng A50 - Trung Kính</h4>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-800 relative">
              <img
                src="/assets/c5.jpg"
                alt="Cửa cuốn showroom khớp inox"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-5">
                <span className="text-orange-400 text-[10px] font-bold uppercase">Showroom & TTTM</span>
                <h4 className="text-white font-bold text-sm mt-0.5">Cửa cuốn khớp inox vuông 304 - Vincom</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Branch Network in Hanoi */}
      <section id="branches" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center space-x-1.5 bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            <MapPin className="w-3.5 h-3.5 text-orange-600" />
            <span>Mạng lưới kỹ thuật</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            12 điểm chốt cứu hộ tại các quận Hà Nội
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm">
            Kỹ thuật viên túc trực tại địa bàn, gọi điện trực tiếp để thợ di chuyển ngay sau 15 phút.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {branches.map((b) => (
            <div
              key={b.id}
              className={`p-5 rounded-2xl border transition ${b.isMain
                  ? 'border-orange-500/50 bg-orange-50/30 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="font-bold text-slate-900 text-sm">{b.name}</h3>
                {b.isMain && (
                  <span className="text-[10px] font-bold uppercase bg-slate-900 text-white px-2 py-0.5 rounded">
                    Trụ Sở
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 flex items-start space-x-1.5 mb-3">
                <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                <span>{b.address}</span>
              </p>
              <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs">
                <span className="text-slate-500 font-medium">{b.district}</span>
                <a
                  href={`tel:${b.phone.replace(/\s+/g, '')}`}
                  className="font-bold text-orange-600 hover:text-orange-700 flex items-center space-x-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>{b.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Articles & Guides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-orange-600 font-semibold text-xs uppercase tracking-wider">
              Cẩm Nang Kỹ Thuật
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Kiến Thức Cửa Cuốn Hữu Ích
            </h2>
          </div>
          <Link
            href="/tin-tuc"
            className="mt-3 md:mt-0 text-xs sm:text-sm font-semibold text-orange-600 hover:text-orange-700 hover:underline flex items-center space-x-1"
          >
            <span>Xem thêm bài viết</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articlesData.items.map((art) => (
            <article
              key={art.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
            >
              <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                <img
                  src={art.coverImage || '/assets/dv2.jpg'}
                  alt={art.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm hover:text-orange-600 transition line-clamp-2">
                    <Link href={`/tin-tuc/${art.slug}`}>{art.title}</Link>
                  </h3>
                  {art.excerpt && (
                    <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                      {art.excerpt}
                    </p>
                  )}
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{art.viewCount} xem</span>
                  </span>
                  <Link
                    href={`/tin-tuc/${art.slug}`}
                    className="font-semibold text-orange-600 hover:underline"
                  >
                    Chi tiết →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 9. Refined Call to Action Banner */}
      <section className="bg-slate-900 text-white py-12 px-4 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Cần Khảo Sát Lắp Đặt Hoặc Cứu Hộ Khẩn Cấp?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Tổng đài trực 24/7. Kỹ thuật viên sẵn sàng mang mẫu nan nhôm thực tế đến tận công trình tư vấn miễn phí.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${hotlineClean}`}
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-xl transition flex items-center space-x-2 text-sm shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Gọi Ngay: {hotline}</span>
            </a>
            <a
              href={`https://zalo.me/${general_config?.zalo || '0986888121'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-6 py-3 rounded-xl border border-slate-700 transition text-sm"
            >
              Nhắn Tin Zalo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
