import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Home, PhoneCall, Calculator, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-slate-950 text-white">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 mx-auto shadow-inner">
          <ShieldAlert className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold tracking-widest text-orange-500 uppercase">
            Mã lỗi 404
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Trang không tồn tại
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Rất tiếc, trang bạn đang tìm kiếm có thể đã được thay đổi, di dời hoặc tạm thời không khả dụng.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-medium text-sm transition shadow-lg shadow-orange-600/20"
          >
            <Home className="w-4 h-4" />
            <span>Về trang chủ</span>
          </Link>

          <Link
            href="/bang-gia"
            className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-medium text-sm transition"
          >
            <Calculator className="w-4 h-4" />
            <span>Báo giá cửa cuốn</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-900 text-xs text-slate-500 flex items-center justify-center space-x-2">
          <span>Hỗ trợ sự cố kỹ thuật 24/7:</span>
          <a
            href="tel:0986888121"
            className="text-orange-400 hover:underline font-semibold inline-flex items-center space-x-1"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>0986 888 121</span>
          </a>
        </div>
      </div>
    </div>
  );
}
