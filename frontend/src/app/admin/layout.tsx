'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Settings,
  Package,
  PhoneCall,
  FileText,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState('Quản Trị Viên');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // If on login page, render clean login view without admin shell
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) return;
    const token = localStorage.getItem('cuacuon_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    const userStr = localStorage.getItem('cuacuon_user');
    if (userStr) {
      try {
        const u = JSON.parse(userStr);
        setUserName(u.name || 'Quản Trị Viên');
      } catch (e) {}
    }
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem('cuacuon_token');
    localStorage.removeItem('cuacuon_user');
    router.push('/admin/login');
  };

  const navItems = [
    { name: 'Tổng Quan', href: '/admin', icon: LayoutDashboard },
    { name: 'Cài Đặt Website (CMS)', href: '/admin/settings', icon: Settings },
    { name: 'Sản Phẩm Cửa Cuốn', href: '/admin/products', icon: Package },
    { name: 'Cứu Hộ & Báo Giá (Leads)', href: '/admin/quotes', icon: PhoneCall },
    { name: 'Bài Viết / Cẩm Nang', href: '/admin/articles', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col lg:flex-row">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-slate-950 border-r border-slate-800 p-6 justify-between shrink-0">
        <div className="space-y-8">
          {/* Logo Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-black text-white text-base leading-tight">CMS THỦ ĐÔ</div>
              <p className="text-[10px] text-slate-400">Admin Control Panel</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer Card */}
        <div className="border-t border-slate-800 pt-6 space-y-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-xs text-brand-400 hover:text-brand-300 font-bold px-2 py-1.5 rounded-lg hover:bg-slate-900 transition"
          >
            <span>Xem Website Ngoài</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center justify-between pt-2">
            <div className="truncate max-w-[140px]">
              <span className="block text-xs font-bold text-white truncate">{userName}</span>
              <span className="text-[10px] text-slate-400">Quản Trị Viên</span>
            </div>
            <button
              onClick={handleLogout}
              title="Đăng xuất"
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Top Navbar for Mobile */}
      <div className="lg:hidden bg-slate-950 border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="font-black text-sm text-white">CMS THỦ ĐÔ</span>
        </div>
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 text-slate-300 hover:text-white"
        >
          {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileNavOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileNavOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                pathname === item.href ? 'bg-brand-600 text-white' : 'text-slate-400 hover:bg-slate-900'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-slate-900"
          >
            Đăng Xuất
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
}

