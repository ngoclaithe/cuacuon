'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  PhoneCall,
  Clock,
  CheckCircle,
  Package,
  Settings,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { QuoteRequest } from '@/types';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ total: 0, pending: 0, contacted: 0, completed: 0 });
  const [recentQuotes, setRecentQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('cuacuon_token');
      try {
        const [statsRes, quotesRes] = await Promise.all([
          fetch('http://localhost:4000/api/quotes/stats', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('http://localhost:4000/api/quotes?limit=5', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (statsRes.ok) {
          setStats(await statsRes.json());
        }
        if (quotesRes.ok) {
          const data = await quotesRes.json();
          setRecentQuotes(data.items || []);
        }
      } catch (err) {
        console.error('Error fetching admin dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Top Welcome Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Bảng Điều Khiển CMS</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Theo dõi lưu lượng yêu cầu cứu hộ, đơn báo giá và cấu hình website Next.js
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/settings"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center space-x-2 transition border border-slate-700"
          >
            <Settings className="w-4 h-4 text-brand-400" />
            <span>Cài Đặt Website</span>
          </Link>
          <Link
            href="/admin/products"
            className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center space-x-2 transition shadow-lg shadow-brand-600/30"
          >
            <Package className="w-4 h-4" />
            <span>Thêm Sản Phẩm Mới</span>
          </Link>
        </div>
      </div>

      {/* Stats KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{stats.pending}</div>
            <div className="text-xs text-red-300 font-bold uppercase mt-0.5">Chờ Cứu Hộ / Báo Giá</div>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{stats.contacted}</div>
            <div className="text-xs text-blue-300 font-bold uppercase mt-0.5">Đang Xử Lý / Khảo Sát</div>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{stats.completed}</div>
            <div className="text-xs text-green-300 font-bold uppercase mt-0.5">Đã Hoàn Thành</div>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{stats.total}</div>
            <div className="text-xs text-brand-300 font-bold uppercase mt-0.5">Tổng Số Yêu Cầu</div>
          </div>
        </div>
      </div>

      {/* Recent Rescue / Quote Leads Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <PhoneCall className="w-5 h-5 text-red-500" />
              <span>Yêu Cầu Cứu Hộ & Báo Giá Gần Nhất</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Cần điều thợ hoặc gọi lại cho khách hàng sớm nhất có thể
            </p>
          </div>
          <Link
            href="/admin/quotes"
            className="text-xs text-brand-400 hover:text-brand-300 font-bold flex items-center space-x-1"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentQuotes.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-sm">
            Chưa có yêu cầu nào mới.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-slate-400 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Khách Hàng</th>
                  <th className="py-3 px-4">Số Điện Thoại</th>
                  <th className="py-3 px-4">Dịch Vụ / Loại Cửa</th>
                  <th className="py-3 px-4">Địa Chỉ</th>
                  <th className="py-3 px-4">Trạng Thái</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {recentQuotes.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-900/50">
                    <td className="py-3 px-4 font-bold text-white">{q.customerName}</td>
                    <td className="py-3 px-4 font-mono font-bold text-brand-400">
                      <a href={`tel:${q.phone}`} className="hover:underline">{q.phone}</a>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {q.serviceType === 'CUU_HO_247' ? (
                        <span className="inline-flex items-center gap-1 text-red-400 font-bold">
                          <AlertTriangle className="w-3.5 h-3.5" /> Cứu Hộ Khẩn Cấp
                        </span>
                      ) : (
                        <span>Báo Giá Lắp Mới</span>
                      )}
                      {q.doorType && <div className="text-[11px] text-slate-500">{q.doorType}</div>}
                    </td>
                    <td className="py-3 px-4 text-slate-400">{q.address || 'Hà Nội'}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          q.status === 'PENDING'
                            ? 'bg-red-500/20 text-red-300'
                            : q.status === 'CONTACTED'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-green-500/20 text-green-300'
                        }`}
                      >
                        {q.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href="/admin/quotes"
                        className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-xs font-bold"
                      >
                        Xem & Xử Lý
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

