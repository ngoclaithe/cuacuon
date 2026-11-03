import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Wrench, CheckCircle, Award, Shield } from 'lucide-react';
import { SiteSettings, Branch } from '@/types';

interface FooterProps {
  settings: SiteSettings;
  branches: Branch[];
}

export default function Footer({ settings, branches }: FooterProps) {
  const { general_config } = settings;
  const hotline = general_config?.hotline || '0986 888 121';
  const hotlineClean = hotline.replace(/\s+/g, '');

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-12 border-b border-slate-800">
          <div className="flex items-center space-x-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs sm:text-sm">Cứu Hộ Sau 15 Phút</h4>
              <p className="text-[11px] text-slate-400">Có mặt nhanh tại 12 quận Hà Nội</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs sm:text-sm">100% Chính Hãng</h4>
              <p className="text-[11px] text-slate-400">Đại lý ủy quyền Austdoor & Doortech</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs sm:text-sm">Bảo Hành Lên Đến 3 Năm</h4>
              <p className="text-[11px] text-slate-400">Tem bảo hành điện tử chính hãng</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs sm:text-sm">Giá Chuẩn Niêm Yết</h4>
              <p className="text-[11px] text-slate-400">Báo giá trước khi làm, không phát sinh</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12 border-b border-slate-800">
          {/* Col 1 & 2: Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-wide">
                THỦ ĐÔ <span className="text-orange-500">DOOR</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Cửa Cuốn Thủ Đô là đơn vị hàng đầu tại Hà Nội chuyên cung cấp giải pháp cứu hộ,
              sửa chữa khẩn cấp và phân phối, lắp đặt cửa cuốn Austdoor đồng bộ chính hãng.
            </p>

            <div className="space-y-2 pt-2 text-xs sm:text-sm">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>{general_config?.address || 'Số 36 Ngõ 6 Mạc Thái Tổ, Cầu Giấy, Hà Nội'}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>
                  Hotline Cứu Hộ: <strong className="text-white">{hotline}</strong>
                  {general_config?.hotline2 && ` - ${general_config.hotline2}`}
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>{general_config?.email || 'cuacuonthudo.official@gmail.com'}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                <span>{general_config?.workingHours || 'Phục vụ 24/24 tất cả các ngày trong năm'}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Dịch vụ & Cứu hộ */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3.5 border-l-2 border-orange-500 pl-2.5">
              Dịch Vụ Cửa Cuốn
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/dich-vu" className="hover:text-white transition">
                  Cứu hộ khẩn cấp 24/24
                </Link>
              </li>
              <li>
                <Link href="/dich-vu" className="hover:text-white transition">
                  Sửa cửa cuốn kẹt nan, đứt cót
                </Link>
              </li>
              <li>
                <Link href="/dich-vu" className="hover:text-white transition">
                  Sửa chữa & thay motor cửa cuốn
                </Link>
              </li>
              <li>
                <Link href="/dich-vu" className="hover:text-white transition">
                  Thay bình lưu điện UPS chính hãng
                </Link>
              </li>
              <li>
                <Link href="/dich-vu" className="hover:text-white transition">
                  Sao chép khóa điều khiển từ xa
                </Link>
              </li>
              <li>
                <Link href="/dich-vu" className="hover:text-white transition">
                  Bảo dưỡng cửa cuốn định kỳ
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Sản phẩm nổi bật */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3.5 border-l-2 border-orange-500 pl-2.5">
              Dòng Sản Phẩm
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/san-pham?category=cua-cuon-khe-thoang" className="hover:text-white transition">
                  Cửa cuốn khe thoáng Austdoor
                </Link>
              </li>
              <li>
                <Link href="/san-pham?category=cua-cuon-tam-lien" className="hover:text-white transition">
                  Cửa cuốn tấm liền công nghệ Úc
                </Link>
              </li>
              <li>
                <Link href="/san-pham?category=cua-cuon-khop-inox-sieu-thoang" className="hover:text-white transition">
                  Cửa cuốn khớp Inox vuông
                </Link>
              </li>
              <li>
                <Link href="/san-pham?category=cua-cuon-chong-chay-nha-xuong" className="hover:text-white transition">
                  Cửa cuốn chống cháy tiêu chuẩn
                </Link>
              </li>
              <li>
                <Link href="/san-pham?category=motor-phu-kien-cua-cuon" className="hover:text-white transition">
                  Motor tời & Hộp điều khiển ARC
                </Link>
              </li>
              <li>
                <Link href="/bang-gia" className="text-orange-400 hover:text-orange-300 font-semibold transition">
                  Bảng giá cửa cuốn 2026 →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Hệ thống cứu hộ nhanh */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3.5 border-l-2 border-orange-500 pl-2.5">
              Cơ Sở Cứu Hộ Cơ Động
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <span className="bg-slate-900 px-2 py-1 rounded text-slate-400">Cầu Giấy</span>
              <span className="bg-slate-900 px-2 py-1 rounded text-slate-400">Hà Đông</span>
              <span className="bg-slate-900 px-2 py-1 rounded text-slate-400">Đống Đa</span>
              <span className="bg-slate-900 px-2 py-1 rounded text-slate-400">Ba Đình</span>
              <span className="bg-slate-900 px-2 py-1 rounded text-slate-400">Hai Bà Trưng</span>
              <span className="bg-slate-900 px-2 py-1 rounded text-slate-400">Thanh Xuân</span>
              <span className="bg-slate-900 px-2 py-1 rounded text-slate-400">Bắc Từ Liêm</span>
              <span className="bg-slate-900 px-2 py-1 rounded text-slate-400">Nam Từ Liêm</span>
              <span className="bg-slate-900 px-2 py-1 rounded text-slate-400">Long Biên</span>
              <span className="bg-slate-900 px-2 py-1 rounded text-slate-400">Tây Hồ</span>
              <span className="bg-slate-900 px-2 py-1 rounded text-slate-400">Hoàng Mai</span>
              <span className="bg-slate-900 px-2 py-1 rounded text-slate-400">Thanh Trì</span>
            </div>
            <div className="mt-3">
              <Link
                href="/lien-he#branches"
                className="text-xs text-orange-400 hover:text-orange-300 font-semibold"
              >
                Chi tiết 12 chi nhánh →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Thủ Đô Door (cuacuonthudo.com). Bảo lưu mọi quyền.</p>
          <div className="flex items-center space-x-6">
            <Link href="/admin/login" className="hover:text-slate-400 transition">
              Quản Trị CMS
            </Link>
            <Link href="/sitemap.xml" className="hover:text-slate-400 transition">
              Sitemap
            </Link>
            <Link href="/robots.txt" className="hover:text-slate-400 transition">
              Robots
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
