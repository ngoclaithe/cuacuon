'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Calculator, Clock, ShieldCheck, Award } from 'lucide-react';
import { SiteSettings } from '@/types';

interface HeroSliderProps {
  settings: SiteSettings;
}

export default function HeroSlider({ settings }: HeroSliderProps) {
  const { hero_banners = [], general_config } = settings;
  const [activeSlide, setActiveSlide] = useState(0);

  const banners = hero_banners.length > 0 ? hero_banners : [
    {
      id: 1,
      tag: 'CỨU HỘ KHẨN CẤP 24/24',
      title: 'Cứu Hộ Cửa Cuốn Hà Nội Có Mặt Sau 15 Phút',
      subtitle: 'Kẹt nan, đứt cót, chập hộp tín hiệu, hỏng mô tơ, mất chìa khóa... Đội ngũ kỹ thuật túc trực tại 12 quận nội thành giải quyết triệt để sự cố.',
      image: '/assets/Slide2-1894x708-1.jpg',
      ctaText: 'Gọi Cứu Hộ: 0986 888 121',
      ctaLink: 'tel:0986888121',
      secondaryText: 'Dự Toán Chi Phí',
      secondaryLink: '#calculator',
    }
  ];

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const current = banners[activeSlide] || banners[0];
  const hotline = general_config?.hotline || '0986 888 121';
  const hotlineClean = hotline.replace(/\s+/g, '');

  return (
    <div className="relative bg-slate-950 overflow-hidden">
      {/* Background Banner with Architectural Dark Gradient */}
      <div className="relative min-h-[500px] sm:min-h-[560px] flex items-center">
        {banners.map((banner, idx) => (
          <div
            key={banner.id || idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === activeSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={banner.image || '/assets/Slide2-1894x708-1.jpg'}
              alt={banner.title}
              className="w-full h-full object-cover object-center"
            />
            {/* Cinematic architectural gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40"></div>
          </div>
        ))}

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 z-10 w-full">
          <div className="max-w-2xl text-white space-y-5">
            {/* Subdued Elegant Pill Badge */}
            <div className="inline-flex items-center space-x-2 bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
              <span>{current.tag || 'CỨU HỘ KHẨN CẤP 24/24'}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white">
              {current.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-normal">
              {current.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={`tel:${hotlineClean}`}
                className="py-3.5 px-6 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-lg shadow-orange-950/30 transition flex items-center justify-center space-x-2.5"
              >
                <Phone className="w-4 h-4" />
                <span>GỌI CỨU HỘ: {hotline}</span>
              </a>

              <a
                href="/#calculator"
                className="py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 backdrop-blur-sm transition flex items-center justify-center space-x-2"
              >
                <Calculator className="w-4 h-4 text-orange-400" />
                <span>Dự Toán Chi Phí Nhanh</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap gap-6 text-xs text-slate-300">
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>Có mặt sau 15 phút</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Bảo hành chính hãng 24 - 36 tháng</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Cam kết giá chuẩn niêm yết</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slide navigation dots */}
        {banners.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-1.5">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                aria-label={`Chuyển banner ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === activeSlide ? 'w-6 bg-orange-500' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modern Stats Bar */}
      <div className="bg-slate-900 border-t border-slate-800 text-white py-4 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="border-r border-slate-800 last:border-none">
            <div className="text-xl sm:text-2xl font-black text-white">12+ Năm</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Kinh nghiệm phân phối & cứu hộ</div>
          </div>
          <div className="border-r border-slate-800 last:border-none">
            <div className="text-xl sm:text-2xl font-black text-white">25,000+</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Khách hàng tin chọn Thủ Đô</div>
          </div>
          <div className="border-r border-slate-800 last:border-none">
            <div className="text-xl sm:text-2xl font-black text-white">12 Cơ Sở</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Phủ khắp các quận Hà Nội</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-orange-500">15 Phút</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Thời gian có mặt tận nơi</div>
          </div>
        </div>
      </div>
    </div>
  );
}
