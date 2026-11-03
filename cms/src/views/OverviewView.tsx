import React, { useEffect, useState } from 'react';
import { PhoneCall, Clock, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import { API_BASE } from '../config';
import type { QuoteRequest } from '../types';

interface OverviewViewProps {
  token: string;
  onNavigateToQuotes: () => void;
}

export default function OverviewView({ token, onNavigateToQuotes }: OverviewViewProps) {
  const [stats, setStats] = useState({ total: 0, pending: 0, contacted: 0, completed: 0 });
  const [recentQuotes, setRecentQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, quotesRes] = await Promise.all([
          fetch(`${API_BASE}/quotes/stats`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE}/quotes?limit=5`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (statsRes.ok) setStats(await statsRes.json());
        if (quotesRes.ok) {
          const data = await quotesRes.json();
          setRecentQuotes(data.items || []);
        }
      } catch (err) {
        console.error('Error fetching overview data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return <div className="text-slate-400 text-sm py-10">Đang tải dữ liệu tổng quan...</div>;
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Tổng quan</h1>
        <p className="text-xs text-slate-400 mt-0.5">Theo dõi yêu cầu cứu hộ và báo giá từ khách hàng</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center space-x-4">
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{stats.pending}</div>
            <div className="text-xs text-slate-400">Chờ liên hệ</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center space-x-4">
          <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{stats.contacted}</div>
            <div className="text-xs text-slate-400">Đang xử lý</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center space-x-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{stats.completed}</div>
            <div className="text-xs text-slate-400">Đã hoàn thành</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center space-x-4">
          <div className="w-11 h-11 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-xs text-slate-400">Tổng yêu cầu</div>
          </div>
        </div>
      </div>

      {/* Recent Quotes Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white">Yêu cầu mới nhất</h2>
            <p className="text-xs text-slate-400 mt-0.5">Danh sách khách hàng cần gọi lại hoặc điều phối thợ</p>
          </div>
          <button
            onClick={onNavigateToQuotes}
            className="text-xs text-orange-400 hover:underline font-medium"
          >
            Xem tất cả →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="py-3 px-4">Khách hàng</th>
                <th className="py-3 px-4">Số điện thoại</th>
                <th className="py-3 px-4">Dịch vụ</th>
                <th className="py-3 px-4">Địa chỉ</th>
                <th className="py-3 px-4">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {recentQuotes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    Chưa có yêu cầu nào
                  </td>
                </tr>
              ) : (
                recentQuotes.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 font-semibold text-white">{q.customerName}</td>
                    <td className="py-3 px-4">
                      <a href={`tel:${q.phone}`} className="text-orange-400 hover:underline font-mono">
                        {q.phone}
                      </a>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-slate-300">
                        {q.serviceType === 'CUU_HO_KHAN_CAP' ? 'Cứu hộ khẩn cấp' : 'Báo giá lắp mới'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 max-w-xs truncate">{q.address || '—'}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                          q.status === 'PENDING'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : q.status === 'COMPLETED'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}
                      >
                        {q.status === 'PENDING'
                          ? 'Chờ liên hệ'
                          : q.status === 'COMPLETED'
                          ? 'Hoàn thành'
                          : 'Đang xử lý'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
