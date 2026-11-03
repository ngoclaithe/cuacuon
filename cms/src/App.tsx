import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import LoginView from './views/LoginView';
import OverviewView from './views/OverviewView';
import SettingsView from './views/SettingsView';
import ProductsView from './views/ProductsView';
import QuotesView from './views/QuotesView';
import ArticlesView from './views/ArticlesView';

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('Quản trị viên');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [initializing, setInitializing] = useState<boolean>(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('cms_token');
    const savedUser = localStorage.getItem('cms_user');
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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-xs">
        Đang khởi tạo hệ thống...
      </div>
    );
  }

  if (!token) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        userName={userName}
      />
      <main className="flex-1 p-5 sm:p-8 overflow-y-auto max-h-screen">
        {activeTab === 'overview' && (
          <OverviewView token={token} onNavigateToQuotes={() => setActiveTab('quotes')} />
        )}
        {activeTab === 'settings' && <SettingsView token={token} />}
        {activeTab === 'products' && <ProductsView token={token} />}
        {activeTab === 'quotes' && <QuotesView token={token} />}
        {activeTab === 'articles' && <ArticlesView token={token} />}
      </main>
    </div>
  );
}
