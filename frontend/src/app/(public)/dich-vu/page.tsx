import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteSettings, getBranches } from '@/lib/api';
import {
  ShieldAlert,
  Phone,
  Clock,
  Wrench,
  CheckCircle,
  Key,
  ShieldCheck,
  Zap,
  RefreshCw,
  FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dịch Vụ Cứu Hộ & Sửa Cửa Cuốn Hà Nội 24/24 | Có Mặt Sau 15 Phút',
  description: 'Dịch vụ cứu hộ cửa cuốn 24/24 chuyên nghiệp tại Hà Nội. Sửa kẹt nan, đứt cót, hỏng motor, mất chìa khóa. Kỹ thuật viên có mặt sau 15 phút, bảo hành dài hạn.',
};

export default async function ServicesPage() {
  const [settings, branches] = await Promise.all([
    getSiteSettings(),
    getBranches(),
  ]);

  const { general_config } = settings;
  const hotline = general_config?.hotline || '0986 888 121';
  const hotlineClean = hotline.replace(/\s+/g, '');

  const services = [
    {
      title: 'Cứu Hộ Cửa Cuốn Khẩn Cấp 24/24',
      badge: '15 Phút Có Mặt',
      desc: 'Cứu hộ khẩn cấp khi cửa cuốn bị kẹt không lên/xuống được, rơi nan nguy hiểm hoặc mất điện giữa đêm. Đội cơ động phục vụ xuyên đêm tại 12 quận Hà Nội.',
      icon: ShieldAlert,
      color: 'red',
      features: ['Trực tổng đài 24/7 kể cả ngày Lễ Tết', 'Có mặt tận nhà sau 15 phút', 'Đầy đủ trang thiết bị cứu hộ chuyên dụng'],
    },
    {
      title: 'Sửa Kẹt Nan, Xô Nan, Đứt Cót Lò Xo',
      badge: 'Xử Lý Nhanh',
      desc: 'Nắn chỉnh nan cửa cuốn bị cong vênh, thay thế nan lá bị rách gãy, căng lại hoặc thay mới lò xo trợ lực cửa tấm liền bảo hành 2 năm.',
      icon: Wrench,
      color: 'brand',
      features: ['Thay thế nan chính hãng Austdoor/Doortech', 'Căn chỉnh mép ray chuẩn tuyệt đối', 'Tặng bộ tự dừng chống xô nan an toàn'],
    },
    {
      title: 'Sửa Chữa & Thay Thế Motor Cửa Cuốn',
      badge: 'Chính Hãng 100%',
      desc: 'Khắc phục triệt để lỗi mô tơ bị chập cháy, kêu to, trượt phanh tụt cửa. Thay mới mô tơ tời dây đồng nguyên chất tải trọng 300kg - 1000kg.',
      icon: Zap,
      color: 'blue',
      features: ['Linh kiện nhập khẩu Đài Loan YH & Austdoor', 'Bảo hành đổi mới từ 24 đến 36 tháng', 'Kiểm tra mạch phanh an toàn trước khi bàn giao'],
    },
    {
      title: 'Sao Chép Remote & Đổi Mã Chống Trộm ARC',
      badge: 'Bảo Mật Cao',
      desc: 'Làm thêm tay chìa điều khiển từ xa chính hãng, đổi mã số hộp nhận tín hiệu bảo mật ngăn chặn kẻ gian dò quét sóng mở trộm cửa.',
      icon: Key,
      color: 'amber',
      features: ['Công nghệ mã nhảy Rolling Code chống sao chép', 'Cài đặt tận nhà trong 10 phút', 'Chống nước, bắt sóng xa trên 50m'],
    },
    {
      title: 'Thay Bình Lưu Điện Cửa Cuốn UPS',
      badge: 'Lưu Điện 72H',
      desc: 'Cung cấp bình tích điện UPS thế hệ mới có tính năng tự động xả sạc, chống chai ắc quy, đảm bảo đóng mở cửa an toàn khi cắt điện luân phiên.',
      icon: RefreshCw,
      color: 'green',
      features: ['Thời gian lưu điện từ 48 - 72 giờ', 'Ắc quy khô chuyên dụng không cần bảo dưỡng', 'Bo mạch vi xử lý bảo vệ quá nhiệt'],
    },
    {
      title: 'Bảo Dưỡng Cửa Cuốn Định Kỳ Trọn Gói',
      badge: 'Chống Hỏng Hóc',
      desc: 'Gói chăm sóc định kỳ: tra mỡ chịu nhiệt trục quay, cân bằng lò xo, tra dầu gioăng cao su giảm chấn, kiểm tra rơ le tự dừng và dây xích kéo tay.',
      icon: ShieldCheck,
      color: 'purple',
      features: ['Kéo dài tuổi thọ cửa cuốn thêm 5 - 10 năm', 'Vận hành êm ái triệt tiêu tiếng kêu cọt kẹt', 'Phát hiện sớm rủi ro đứt nan hoặc đứt xích'],
    },
  ];

  return (
    <div className="py-10 bg-slate-50 min-h-screen space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-navy-950 via-slate-900 to-navy-900 rounded-3xl p-8 sm:p-14 text-white shadow-xl relative overflow-hidden mb-12">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center space-x-2 bg-red-600 text-white font-extrabold text-xs uppercase px-3.5 py-1.5 rounded-full">
              <Clock className="w-3.5 h-3.5" />
              <span>Phục Vụ 24/7 Kể Cả Ban Đêm</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Dịch Vụ Cứu Hộ & Sửa Chữa Cửa Cuốn Chuyên Nghiệp Hà Nội
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Với hơn 12 năm kinh nghiệm và mạng lưới 12 cơ sở túc trực khắp các quận,
              Cửa Cuốn Thủ Đô cam kết có mặt tại nhà quý khách sau 15 phút, giải quyết dứt điểm
              mọi sự cố với mức giá niêm yết chuẩn nhất.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={`tel:${hotlineClean}`}
                className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-3.5 rounded-xl shadow-lg flex items-center space-x-2 text-sm sm:text-base"
              >
                <Phone className="w-5 h-5 fill-current animate-bounce" />
                <span>Gọi Cứu Hộ: {hotline}</span>
              </a>
              <Link
                href="/bang-gia"
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-xl border border-white/20 transition text-sm sm:text-base"
              >
                Xem Bảng Giá Sửa Chữa
              </Link>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                      {s.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy-950 mb-2.5">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {s.desc}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 pt-4">
                    {s.features.map((f, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100">
                  <a
                    href={`tel:${hotlineClean}`}
                    className="w-full py-2.5 bg-slate-100 hover:bg-brand-600 hover:text-white text-slate-800 font-bold rounded-xl text-center text-xs transition flex items-center justify-center space-x-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Yêu Cầu Thợ: {hotline}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* 12 Branches Directory list */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950">
              Điểm Chốt Kỹ Thuật Cơ Động 12 Quận Hà Nội
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Bấm gọi trực tiếp cho chốt trực gần nhà bạn nhất để thợ xuất phát ngay:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {branches.map((b) => (
              <div key={b.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                <div className="font-bold text-slate-900 text-sm mb-1">{b.name}</div>
                <div className="text-xs text-slate-500 mb-2">{b.address}</div>
                <a
                  href={`tel:${b.phone.replace(/\s+/g, '')}`}
                  className="text-xs font-black text-red-600 hover:underline flex items-center space-x-1"
                >
                  <Phone className="w-3 h-3 fill-current" />
                  <span>Hotline: {b.phone}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

