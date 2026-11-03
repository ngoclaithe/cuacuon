import React from 'react';
import {
  LayoutDashboard,
  Settings,
  Package,
  PhoneCall,
  FileText,
  LogOut,
  ExternalLink,
  Shield,
  Menu,
  X,
} from 'lucide-react';
import { SITE_URL } from '../config';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  userName: string;
}

export default function Sidebar({ activeTab, setActiveTab, onLogout, userName }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navItems = [
    { id: 'overview', name: 'Tổng quan', icon: LayoutDashboard },
    { id: 'settings', name: 'Cài đặt website', icon: Settings },
    { id: 'products', name: 'Sản phẩm cửa cuốn', icon: Package },
    { id: 'quotes', name: 'Yêu cầu báo giá & cứu hộ', icon: PhoneCall },
    { id: 'articles', name: 'Bài viết & tin tức', icon: FileText },
  ];

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden bg-slate-950 border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white">
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm text-white">CMS Thủ Đô Door</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  active ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
            <a
              href={SITE_URL}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-orange-400 hover:underline flex items-center space-x-1"
            >
              <span>Xem website</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={onLogout}
              className="text-xs text-red-400 hover:underline flex items-center space-x-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-950 border-r border-slate-800 p-5 justify-between shrink-0 h-screen sticky top-0">
        <div className="space-y-6">
          <div className="flex items-center space-x-3 px-2">
            <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-black text-white text-sm tracking-wide">CMS THỦ ĐÔ</div>
              <p className="text-[11px] text-slate-400">Hệ thống quản trị</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                    active
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-slate-800 pt-4 space-y-3 px-2">
          <a
            href={SITE_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between text-xs text-slate-400 hover:text-orange-400 transition"
          >
            <span>Xem website ngoài</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center justify-between pt-1">
            <div className="truncate text-xs">
              <div className="font-semibold text-white truncate">{userName || 'Quản trị viên'}</div>
              <div className="text-[10px] text-slate-400">admin@cuacuonthudo.com</div>
            </div>
            <button
              onClick={onLogout}
              title="Đăng xuất"
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

