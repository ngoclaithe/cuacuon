import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import PriceCalculator from '@/components/Calculator';
import { getSiteSettings } from '@/lib/api';
import { ShieldCheck, Phone, CheckCircle, Calculator, FileText, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bảng Báo Giá Cửa Cuốn Hà Nội 2026 Mới Nhất | Cửa Cuốn Thủ Đô',
  description: 'Báo giá cửa cuốn khe thoáng Austdoor, cửa cuốn tấm liền, motor và bình lưu điện chính hãng 2026. Bảng giá sửa chữa cứu hộ cửa cuốn 24/24 minh bạch, chuẩn niêm yết.',
  keywords: 'báo giá cửa cuốn, giá cửa cuốn austdoor 2026, giá sửa cửa cuốn hà nội, giá motor cửa cuốn',
};

export default async function PricingPage() {
  const settings = await getSiteSettings();
  const hotline = settings.general_config?.hotline || '0986 888 121';
  const hotlineClean = hotline.replace(/\s+/g, '');

  return (
    <div className="py-10 bg-slate-50 min-h-screen space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm text-center max-w-4xl mx-auto mb-10">
          <span className="inline-flex items-center space-x-1.5 bg-orange-100 text-orange-800 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Niêm Yết Mới Nhất 2026</span>
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Bảng Báo Giá Cửa Cuốn & Dịch Vụ Cứu Hộ Thủ Đô
          </h1>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto">
            Cam kết giá gốc đại lý, báo giá trọn gói đã bao gồm ray trục và công thợ lắp đặt hoàn thiện.
          </p>
        </div>

        {/* 1. Bảng giá Cửa cuốn Khe thoáng */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-10 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                1. Báo Giá Cửa Cuốn Nan Nhôm Khe Thoáng Austdoor
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Nan nhôm hợp kim AL6063 T5, sơn tĩnh điện ngoài trời cao cấp AkzoNobel
              </p>
            </div>
            <span className="hidden sm:inline-block text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">
              Bảo hành 24 - 36 Tháng
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Tên Model</th>
                  <th className="py-3 px-4">Độ Dày Nan</th>
                  <th className="py-3 px-4">Đặc Điểm Nổi Bật</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">Đơn Giá (đ/m²)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Austdoor A50</td>
                  <td className="py-3.5 px-4 text-slate-600">1.2 - 1.3 mm</td>
                  <td className="py-3.5 px-4 text-slate-600">Nan kép có gioăng giảm chấn 2 chiều siêu êm</td>
                  <td className="py-3.5 px-4 text-right font-black text-orange-600">1.750.000 đ</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Austdoor C70</td>
                  <td className="py-3.5 px-4 text-slate-600">1.2 - 2.3 mm</td>
                  <td className="py-3.5 px-4 text-slate-600">Lỗ thoáng gấp 4 lần, phối 2 màu cafe và vàng kem</td>
                  <td className="py-3.5 px-4 text-right font-black text-orange-600">2.450.000 đ</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Austdoor S52i</td>
                  <td className="py-3.5 px-4 text-slate-600">1.0 - 1.2 mm</td>
                  <td className="py-3.5 px-4 text-slate-600">Dòng siêu êm kinh tế, kẹp đệm nhựa PA</td>
                  <td className="py-3.5 px-4 text-right font-black text-orange-600">1.680.000 đ</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Austdoor S50i</td>
                  <td className="py-3.5 px-4 text-slate-600">1.2 - 1.3 mm</td>
                  <td className="py-3.5 px-4 text-slate-600">Thân cửa cứng vững, màu cafe ánh kim</td>
                  <td className="py-3.5 px-4 text-right font-black text-orange-600">1.820.000 đ</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Khớp Inox Vuông 304</td>
                  <td className="py-3.5 px-4 text-slate-600">Ống phi tròn & hộp</td>
                  <td className="py-3.5 px-4 text-slate-600">Độ mở thoáng 85%, chuyên Showroom & TTTM</td>
                  <td className="py-3.5 px-4 text-right font-black text-orange-600">2.950.000 đ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Bảng giá Cửa cuốn Tấm liền Úc */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-10 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                2. Báo Giá Cửa Cuốn Tấm Liền Công Nghệ Úc (Austroll)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Thép mạ màu hợp kim Colorbond, đóng mở siêu nhanh, kéo tay nhẹ nhàng
              </p>
            </div>
            <span className="hidden sm:inline-block text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
              Bảo hành 24 Tháng
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Dòng Sản Phẩm</th>
                  <th className="py-3 px-4">Độ Dày Thép</th>
                  <th className="py-3 px-4">Công Nghệ & Màu Sắc</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">Đơn Giá (đ/m²)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Series 1 (Austroll CB)</td>
                  <td className="py-3.5 px-4 text-slate-600">0.53 mm</td>
                  <td className="py-3.5 px-4 text-slate-600">Thép mạ kẽm Colorbond Úc cao cấp nhất</td>
                  <td className="py-3.5 px-4 text-right font-black text-orange-600">920.000 đ</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Series 2 (Apex AP)</td>
                  <td className="py-3.5 px-4 text-slate-600">0.51 mm</td>
                  <td className="py-3.5 px-4 text-slate-600">Hợp kim Apex tráng nhôm kẽm</td>
                  <td className="py-3.5 px-4 text-right font-black text-orange-600">830.000 đ</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Series 3 (Econoroll TM)</td>
                  <td className="py-3.5 px-4 text-slate-600">0.48 mm</td>
                  <td className="py-3.5 px-4 text-slate-600">Dòng kinh tế cho nhà xưởng & kiot</td>
                  <td className="py-3.5 px-4 text-right font-black text-orange-600">750.000 đ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Bảng giá Phụ kiện Motor & Bình Lưu Điện */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-10 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                3. Báo Giá Motor Tời & Bình Lưu Điện UPS
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Đồng bộ hộp nhận ARC mã nhảy chống trộm, lõi dây đồng 100%
              </p>
            </div>
            <span className="hidden sm:inline-block text-xs font-bold text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">
              Bảo hành đổi mới 36T
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Tên Thiết Bị</th>
                  <th className="py-3 px-4">Tải Trọng / Dung Lượng</th>
                  <th className="py-3 px-4">Bảo Hành</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">Đơn Giá Trọn Bộ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Motor Austdoor AK500</td>
                  <td className="py-3.5 px-4 text-slate-600">Tải trọng 500 kg</td>
                  <td className="py-3.5 px-4 text-slate-600">36 tháng</td>
                  <td className="py-3.5 px-4 text-right font-black text-orange-600">5.200.000 đ</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Motor Austdoor AK800</td>
                  <td className="py-3.5 px-4 text-slate-600">Tải trọng 800 kg (cửa lớn)</td>
                  <td className="py-3.5 px-4 text-slate-600">36 tháng</td>
                  <td className="py-3.5 px-4 text-right font-black text-orange-600">7.500.000 đ</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Bình Lưu Điện UPS E2000</td>
                  <td className="py-3.5 px-4 text-slate-600">Lưu 48 - 72 giờ</td>
                  <td className="py-3.5 px-4 text-slate-600">24 tháng bo mạch</td>
                  <td className="py-3.5 px-4 text-right font-black text-orange-600">3.100.000 đ</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Hộp Nhận Sóng ARC Austdoor</td>
                  <td className="py-3.5 px-4 text-slate-600">Kèm 2 tay chìa khóa remote</td>
                  <td className="py-3.5 px-4 text-slate-600">12 tháng</td>
                  <td className="py-3.5 px-4 text-right font-black text-orange-600">1.450.000 đ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Bảng giá Dịch vụ Cứu hộ & Sửa chữa khẩn cấp */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-red-600 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>4. Báo Giá Dịch Vụ Cứu Hộ Sửa Cửa Cuốn 24/24 Tại Hà Nội</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Kỹ thuật viên có mặt sau 15 phút. Kiểm tra báo đúng giá, không chặt chém.
              </p>
            </div>
            <a
              href={`tel:${hotlineClean}`}
              className="text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-full shadow"
            >
              Gọi Cứu Hộ: {hotline}
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-red-50 text-red-800 font-bold uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Hạng Mục Sửa Chữa</th>
                  <th className="py-3 px-4">Tình Trạng Sự Cố</th>
                  <th className="py-3 px-4">Thời Gian Xử Lý</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">Chi Phí Tham Khảo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Xử lý kẹt nan, xô nan</td>
                  <td className="py-3.5 px-4 text-slate-600">Cửa bị kẹt vật cản, nan xô lệch không xuống được</td>
                  <td className="py-3.5 px-4 text-slate-600">20 - 35 phút</td>
                  <td className="py-3.5 px-4 text-right font-black text-slate-900">Từ 250.000 đ</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Sửa motor cửa cuốn</td>
                  <td className="py-3.5 px-4 text-slate-600">Motor không chạy, kêu to, trôi trượt phanh</td>
                  <td className="py-3.5 px-4 text-slate-600">30 - 45 phút</td>
                  <td className="py-3.5 px-4 text-right font-black text-slate-900">Từ 350.000 đ</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Thay cót lò xo trợ lực</td>
                  <td className="py-3.5 px-4 text-slate-600">Cửa tấm liền bị đứt cót không đẩy lên được</td>
                  <td className="py-3.5 px-4 text-slate-600">40 phút</td>
                  <td className="py-3.5 px-4 text-right font-black text-slate-900">Từ 450.000 đ</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Sao chép remote / đổi mã ARC</td>
                  <td className="py-3.5 px-4 text-slate-600">Mất chìa khóa, cần đổi mã chống trộm</td>
                  <td className="py-3.5 px-4 text-slate-600">10 phút</td>
                  <td className="py-3.5 px-4 text-right font-black text-slate-900">180.000 - 300.000 đ</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Bảo dưỡng toàn bộ cửa cuốn</td>
                  <td className="py-3.5 px-4 text-slate-600">Tra dầu mỡ trục, căng lò xo, căn chỉnh ray</td>
                  <td className="py-3.5 px-4 text-slate-600">30 phút</td>
                  <td className="py-3.5 px-4 text-right font-black text-slate-900">200.000 đ / bộ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Calculator embedded */}
      <PriceCalculator />
    </div>
  );
}

