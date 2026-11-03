import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
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
    return (
      <div className="text-slate-500 text-sm py-12 flex items-center justify-center font-medium">
        Đang tải dữ liệu tổng quan...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Tổng quan</h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Theo dõi yêu cầu cứu hộ và báo giá từ khách hàng
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center space-x-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{stats.pending}</div>
            <div className="text-xs font-semibold text-slate-500">Chờ liên hệ</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center space-x-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{stats.contacted}</div>
            <div className="text-xs font-semibold text-slate-500">Đang xử lý</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center space-x-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{stats.completed}</div>
            <div className="text-xs font-semibold text-slate-500">Đã hoàn thành</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center space-x-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{stats.total}</div>
            <div className="text-xs font-semibold text-slate-500">Tổng yêu cầu</div>
          </div>
        </div>
      </div>

      {/* Recent Quotes Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Yêu cầu mới nhất</h2>
            <p className="text-xs text-slate-500 mt-0.5">Danh sách khách hàng cần gọi lại hoặc điều phối thợ</p>
          </div>
          <button
            onClick={onNavigateToQuotes}
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition"
          >
            Xem tất cả →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase tracking-wider font-bold text-[11px]">
              <tr>
                <th className="py-3 px-4">Khách hàng</th>
                <th className="py-3 px-4">Số điện thoại</th>
                <th className="py-3 px-4">Dịch vụ</th>
                <th className="py-3 px-4">Địa chỉ</th>
                <th className="py-3 px-4">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recentQuotes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    Chưa có yêu cầu nào
                  </td>
                </tr>
              ) : (
                recentQuotes.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-bold text-slate-900">{q.customerName}</td>
                    <td className="py-3 px-4">
                      <a href={`tel:${q.phone}`} className="text-orange-600 hover:underline font-mono font-semibold">
                        {q.phone}
                      </a>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-slate-700 font-medium">
                        {q.serviceType === 'CUU_HO_KHAN_CAP' ? 'Cứu hộ khẩn cấp' : 'Báo giá lắp mới'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 max-w-xs truncate">{q.address || '—'}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          q.status === 'PENDING'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : q.status === 'COMPLETED'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
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
