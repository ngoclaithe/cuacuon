'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@cuacuonthudo.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Đăng nhập không thành công');
      }

      // Store token & user
      localStorage.setItem('cuacuon_token', data.accessToken);
      localStorage.setItem('cuacuon_user', JSON.stringify(data.user));

      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Lỗi kết nối máy chủ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white mx-auto shadow-lg">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white">Đăng Nhập CMS Quản Trị</h1>
          <p className="text-xs text-slate-400">
            Hệ thống quản lý cài đặt website & đơn hàng Cửa Cuốn Thủ Đô
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Email Quản Trị:
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500"
                placeholder="admin@cuacuonthudo.com"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Mật Khẩu:
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500"
                placeholder="••••••••"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400">
            Tài khoản mẫu: <strong className="text-white">admin@cuacuonthudo.com</strong> / Mật khẩu: <strong className="text-white">admin123</strong>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-black text-sm uppercase tracking-wider shadow-xl transition flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Đang xác thực...' : 'Đăng Nhập Quản Trị'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <a href="/" className="text-xs text-brand-400 hover:underline">
            ← Quay lại trang chủ website
          </a>
        </div>
      </div>
    </div>
  );
}

