'use client';

import React, { useEffect, useState } from 'react';
import { PhoneCall, AlertTriangle, CheckCircle, Clock, Search, MessageSquare, Phone } from 'lucide-react';
import { QuoteRequest } from '@/types';
import { API_BASE } from '@/lib/api';

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [adminNoteInput, setAdminNoteInput] = useState<{ [id: string]: string }>({});

  const fetchQuotes = async () => {
    const token = localStorage.getItem('cuacuon_token');
    const url = filterStatus
      ? `${API_BASE}/quotes?status=${filterStatus}`
      : `${API_BASE}/quotes`;

    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setQuotes(data.items || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [filterStatus]);

  const updateStatus = async (id: string, newStatus: string) => {
    const token = localStorage.getItem('cuacuon_token');
    const note = adminNoteInput[id];

    try {
      const res = await fetch(`${API_BASE}/quotes/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus,
          adminNote: note,
        }),
      });

      if (res.ok) {
        fetchQuotes();
      }
    } catch (err) {
      alert('Lỗi cập nhật trạng thái');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center space-x-2">
            <PhoneCall className="w-7 h-7 text-red-500" />
            <span>Yêu Cầu Cứu Hộ & Báo Giá (Leads)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Tổng cộng: {quotes.length} khách hàng đã gửi yêu cầu qua website
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2">
          {['', 'PENDING', 'CONTACTED', 'COMPLETED'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filterStatus === st
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {st === ''
                ? 'Tất Cả'
                : st === 'PENDING'
                ? 'Chờ Xử Lý'
                : st === 'CONTACTED'
                ? 'Đang Xử Lý'
                : 'Hoàn Thành'}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-slate-400 text-sm">Đang tải danh sách...</div>
        ) : quotes.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-sm">Không có yêu cầu nào.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-slate-400 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Khách Hàng</th>
                  <th className="py-3 px-4">Số Điện Thoại</th>
                  <th className="py-3 px-4">Dịch Vụ & Dự Toán</th>
                  <th className="py-3 px-4">Địa Chỉ / Ghi Chú Khách</th>
                  <th className="py-3 px-4">Ghi Chú Nội Bộ</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">Chuyển Trạng Thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {quotes.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-4 font-bold text-white text-sm">
                      {q.customerName}
                    </td>

                    <td className="py-3.5 px-4">
                      <a
                        href={`tel:${q.phone}`}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 font-mono font-bold hover:bg-red-500/20"
                      >
                        <Phone className="w-3.5 h-3.5 fill-current" />
                        <span>{q.phone}</span>
                      </a>
                    </td>

                    <td className="py-3.5 px-4 space-y-1">
                      <div className="font-bold text-slate-200">
                        {q.serviceType === 'CUU_HO_247' ? (
                          <span className="inline-flex items-center gap-1 text-red-400 font-bold">
                            <AlertTriangle className="w-3.5 h-3.5" /> Cứu Hộ Khẩn Cấp 24/7
                          </span>
                        ) : (
                          <span className="text-brand-400">Dự Toán Báo Giá Lắp Mới</span>
                        )}
                      </div>
                      {q.doorType && (
                        <div className="text-[11px] text-slate-400">{q.doorType}</div>
                      )}
                      {q.estimatedPrice && (
                        <div className="text-[11px] font-bold text-green-400">
                          {q.estimatedPrice.toLocaleString('vi-VN')} đ
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 max-w-xs text-slate-300">
                      <div className="font-semibold text-slate-200">{q.address || 'Hà Nội'}</div>
                      {q.notes && (
                        <div className="text-[11px] text-slate-400 italic mt-0.5">{q.notes}</div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <input
                        type="text"
                        defaultValue={q.adminNote || ''}
                        placeholder="Ghi chú thợ điều động..."
                        onChange={(e) =>
                          setAdminNoteInput({ ...adminNoteInput, [q.id]: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-brand-500"
                      />
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                      <select
                        value={q.status}
                        onChange={(e) => updateStatus(q.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${
                          q.status === 'PENDING'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                            : q.status === 'CONTACTED'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                            : 'bg-green-500/20 text-green-300 border border-green-500/40'
                        }`}
                      >
                        <option value="PENDING" className="bg-slate-900 text-white">Chờ Xử Lý</option>
                        <option value="CONTACTED" className="bg-slate-900 text-white">Đang Liên Hệ / Đo Đạc</option>
                        <option value="COMPLETED" className="bg-slate-900 text-white">Đã Hoàn Thành</option>
                        <option value="CANCELLED" className="bg-slate-900 text-white">Hủy Bỏ</option>
                      </select>
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

