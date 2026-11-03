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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { SITE_URL } from '../config';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  userName: string;
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean | ((prev: boolean) => boolean)) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  onLogout,
  userName,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
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
      <div className="lg:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-sm">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-sm text-slate-900 block leading-tight">CMS Thủ Đô</span>
            <span className="text-[10px] text-slate-500">Quản trị cửa cuốn</span>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 p-4 space-y-1.5 shadow-md">
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
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                  active
                    ? 'bg-orange-500 text-white shadow'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-xs font-semibold">
            <a
              href={SITE_URL}
              target="_blank"
              rel="noreferrer"
              className="text-orange-600 hover:text-orange-700 flex items-center space-x-1"
            >
              <span>Xem website ngoài</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onLogout}
              className="text-red-600 hover:text-red-700 flex items-center space-x-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-white border-r border-slate-200 justify-between shrink-0 h-screen sticky top-0 transition-all duration-300 z-30 shadow-sm ${
          isCollapsed ? 'w-20 p-3' : 'w-64 p-5'
        }`}
      >
        <div className="space-y-6">
          {/* Brand header & toggle */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className={`flex items-center space-x-3 ${isCollapsed ? 'mx-auto' : ''}`}>
              <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-sm shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              {!isCollapsed && (
                <div>
                  <div className="font-extrabold text-slate-900 text-sm tracking-tight leading-tight">
                    CMS THỦ ĐÔ
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">Hệ thống quản trị</p>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <button
                onClick={() => setIsCollapsed(true)}
                title="Thu gọn menu"
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Collapsed expand button */}
          {isCollapsed && (
            <div className="flex justify-center">
              <button
                onClick={() => setIsCollapsed(false)}
                title="Mở rộng menu"
                className="p-2 text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Navigation */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  title={isCollapsed ? item.name : undefined}
                  className={`w-full flex items-center rounded-xl text-sm font-semibold transition ${
                    isCollapsed ? 'justify-center p-3' : 'space-x-3 px-3.5 py-2.5'
                  } ${
                    active
                      ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.name}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div className="border-t border-slate-200 pt-4 space-y-3">
          {!isCollapsed && (
            <a
              href={SITE_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between text-xs font-semibold text-slate-500 hover:text-orange-600 transition px-2 py-1.5 rounded-lg hover:bg-slate-50"
            >
              <span>Xem website ngoài</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          <div
            className={`flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-2.5 ${
              isCollapsed ? 'flex-col space-y-2' : ''
            }`}
          >
            <div className={`truncate ${isCollapsed ? 'text-center' : 'pr-2'}`}>
              <div className="font-bold text-slate-900 text-xs truncate">
                {isCollapsed ? (userName || 'QTV').charAt(0) : userName || 'Quản trị viên'}
              </div>
              {!isCollapsed && (
                <div className="text-[10px] text-slate-500 font-medium">admin@cuacuonthudo.com</div>
              )}
            </div>
            <button
              onClick={onLogout}
              title="Đăng xuất"
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
