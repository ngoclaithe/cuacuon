'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  Clock,
  MapPin,
  Menu,
  X,
  ChevronDown,
  Calculator,
  Shield,
  ShieldAlert,
} from 'lucide-react';
import { SiteSettings, Category } from '@/types';

interface HeaderProps {
  settings: SiteSettings;
  categories: Category[];
}

export default function Header({ settings, categories }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const pathname = usePathname();

  const { general_config } = settings;
  const hotline = general_config?.hotline || '0986 888 121';
  const hotlineClean = hotline.replace(/\s+/g, '');

  const navLinks = [
    { name: 'Trang chủ', href: '/' },
    {
      name: 'Sản phẩm',
      href: '/san-pham',
      hasDropdown: true,
    },
    { name: 'Bảng giá 2026', href: '/bang-gia' },
    { name: 'Cứu hộ 24/7', href: '/dich-vu' },
    { name: 'Cẩm nang', href: '/tin-tuc' },
    { name: 'Chi nhánh', href: '/lien-he#branches' },
    { name: 'Liên hệ', href: '/lien-he' },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top emergency announcement bar - refined dark slate */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center space-x-2 truncate">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="font-semibold text-white uppercase tracking-wider flex items-center gap-1.5 shrink-0">
              <ShieldAlert className="w-3.5 h-3.5 text-orange-400" />
              Cứu hộ cửa cuốn 24/24:
            </span>
            <span className="hidden sm:inline text-slate-300 truncate">
              Kỹ thuật viên túc trực tại 12 quận Hà Nội, có mặt sau 15 phút
            </span>
          </div>

          <div className="flex items-center space-x-4 shrink-0 text-xs">
            <div className="hidden md:flex items-center space-x-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Phục vụ 24/7 & ngày lễ</span>
            </div>
            <a
              href={`tel:${hotlineClean}`}
              className="font-semibold text-orange-400 hover:text-orange-300 transition flex items-center space-x-1.5"
            >
              <Phone className="w-3 h-3" />
              <span>{hotline}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center space-x-3 shrink-0 group">
            <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-orange-500 shadow-sm group-hover:border-orange-500/50 transition">
              <Shield className="w-6 h-6" />
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <div className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                THỦ ĐÔ <span className="text-orange-600 font-extrabold">DOOR</span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase mt-1">
                Cửa cuốn chính hãng & cứu hộ 24/7
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              if (item.hasDropdown) {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setProductDropdownOpen(true)}
                    onMouseLeave={() => setProductDropdownOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-1 transition ${
                        isActive
                          ? 'text-orange-600 font-semibold bg-orange-50/70'
                          : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </Link>

                    {/* Dropdown Menu */}
                    {productDropdownOpen && (
                      <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2.5 z-50 animate-in fade-in duration-150">
                        <div className="px-4 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                          Danh mục cửa cuốn
                        </div>
                        {categories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/san-pham?category=${cat.slug}`}
                            className="block px-4 py-2 text-xs text-slate-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition"
                          >
                            {cat.name}
                          </Link>
                        ))}
                        <div className="border-t border-slate-100 mt-2 pt-2 px-4">
                          <Link
                            href="/san-pham"
                            className="text-xs text-orange-600 font-semibold hover:underline flex items-center justify-between"
                          >
                            <span>Tất cả sản phẩm</span>
                            <span>→</span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition ${
                    isActive
                      ? 'text-orange-600 font-semibold bg-orange-50/70'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Quick Action CTA */}
          <div className="hidden lg:flex items-center space-x-3 shrink-0">
            <Link
              href="/#calculator"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            >
              <Calculator className="w-3.5 h-3.5 text-orange-600" />
              <span>Dự toán giá</span>
            </Link>

            <a
              href={`tel:${hotlineClean}`}
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl transition flex items-center space-x-2.5 group shadow-sm"
            >
              <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-tight">
                <span className="block text-[10px] text-slate-400 font-medium">Hotline 24/7</span>
                <span className="text-xs font-bold tracking-wide text-white">{hotline}</span>
              </div>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-xl text-sm font-medium ${
                pathname === item.href
                  ? 'text-orange-600 bg-orange-50 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2">
            <Link
              href="/#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 px-4 bg-slate-100 font-semibold text-slate-800 rounded-xl text-sm"
            >
              Dự toán chi phí
            </Link>
            <a
              href={`tel:${hotlineClean}`}
              className="w-full text-center py-2.5 px-4 bg-orange-600 text-white font-bold rounded-xl shadow flex items-center justify-center space-x-2 text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Gọi cứu hộ ({hotline})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
