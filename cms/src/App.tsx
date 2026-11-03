import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import LoginView from './views/LoginView';
import OverviewView from './views/OverviewView';
import SettingsView from './views/SettingsView';
import ProductsView from './views/ProductsView';
import QuotesView from './views/QuotesView';
import ArticlesView from './views/ArticlesView';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('Quản trị viên');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [initializing, setInitializing] = useState<boolean>(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('cms_token');
    const savedUser = localStorage.getItem('cms_user');
    const savedCollapsed = localStorage.getItem('cms_sidebar_collapsed');

    if (savedCollapsed) {
      setIsCollapsed(savedCollapsed === 'true');
    }

    if (savedToken) {
      setToken(savedToken);
      if (savedUser) {
        try {
          const u = JSON.parse(savedUser);
          setUserName(u.name || 'Quản trị viên');
        } catch (e) {}
      }
    }
    setInitializing(false);
  }, []);

  const handleToggleSidebar = (val: boolean | ((prev: boolean) => boolean)) => {
    setIsCollapsed((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      localStorage.setItem('cms_sidebar_collapsed', String(next));
      return next;
    });
  };

  const handleLoginSuccess = (newToken: string, user: any) => {
    localStorage.setItem('cms_token', newToken);
    localStorage.setItem('cms_user', JSON.stringify(user));
    setToken(newToken);
    setUserName(user?.name || 'Quản trị viên');
    setActiveTab('overview');
  };

  const handleLogout = () => {
    localStorage.removeItem('cms_token');
    localStorage.removeItem('cms_user');
    setToken(null);
  };

  if (initializing) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 text-sm font-medium">
        Đang khởi tạo hệ thống quản trị...
      </div>
    );
  }

  if (!token) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  const validTabs = ['overview', 'settings', 'products', 'quotes', 'articles'];
  const isValidTab = validTabs.includes(activeTab);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row antialiased">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        userName={userName}
        isCollapsed={isCollapsed}
        setIsCollapsed={handleToggleSidebar}
      />

      <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-h-screen bg-slate-50/70">
        {activeTab === 'overview' && (
          <OverviewView token={token} onNavigateToQuotes={() => setActiveTab('quotes')} />
        )}
        {activeTab === 'settings' && <SettingsView token={token} />}
        {activeTab === 'products' && <ProductsView token={token} />}
        {activeTab === 'quotes' && <QuotesView token={token} />}
        {activeTab === 'articles' && <ArticlesView token={token} />}

        {!isValidTab && (
          <div className="max-w-md mx-auto my-16 bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-5 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Mục không tồn tại</h2>
              <p className="text-sm text-slate-500 mt-1">
                Yêu cầu thao tác không hợp lệ hoặc trang quản lý đã bị gỡ bỏ.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('overview')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs shadow-md transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại tổng quan</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
