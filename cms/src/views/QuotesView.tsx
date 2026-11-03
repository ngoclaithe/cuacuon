import React, { useEffect, useState } from 'react';
import { Phone, CheckCircle, Clock, AlertTriangle, MessageSquare } from 'lucide-react';
import { API_BASE } from '../config';
import type { QuoteRequest } from '../types';

interface QuotesViewProps {
  token: string;
}

export default function QuotesView({ token }: QuotesViewProps) {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [adminNoteInput, setAdminNoteInput] = useState<{ [id: string]: string }>({});

  const fetchQuotes = async () => {
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

  if (loading) {
    return <div className="text-slate-400 text-sm py-10">Đang tải danh sách yêu cầu...</div>;
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Yêu cầu báo giá & cứu hộ</h1>
          <p className="text-xs text-slate-400 mt-0.5">Tiếp nhận thông tin khách hàng và điều phối thợ xử lý</p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl">
          {[
            { id: '', label: 'Tất cả' },
            { id: 'PENDING', label: 'Chờ liên hệ' },
            { id: 'CONTACTED', label: 'Đã liên hệ' },
            { id: 'COMPLETED', label: 'Hoàn thành' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                filterStatus === tab.id
                  ? 'bg-orange-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {quotes.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center text-slate-500 text-xs">
            Không tìm thấy yêu cầu nào phù hợp
          </div>
        ) : (
          quotes.map((q) => (
            <div
              key={q.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      q.serviceType === 'CUU_HO_KHAN_CAP'
                        ? 'bg-red-500/10 text-red-400'
                        : 'bg-orange-500/10 text-orange-400'
                    }`}
                  >
                    {q.serviceType === 'CUU_HO_KHAN_CAP' ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : (
                      <Phone className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{q.customerName}</div>
                    <div className="text-xs text-slate-400">{q.address || 'Chưa cung cấp địa chỉ'}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <a
                    href={`tel:${q.phone}`}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-orange-600 text-white font-bold text-xs hover:bg-orange-500 transition"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{q.phone}</span>
                  </a>
                  <span
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border ${
                      q.status === 'PENDING'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : q.status === 'COMPLETED'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}
                  >
                    {q.status === 'PENDING'
                      ? 'Chờ liên hệ'
                      : q.status === 'COMPLETED'
                      ? 'Hoàn thành'
                      : 'Đang xử lý'}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block text-[10px]">Loại cửa quan tâm:</span>
                  <span className="text-slate-200 font-medium">{q.doorType || 'Tư vấn chung'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Dự toán ước tính:</span>
                  <span className="text-orange-400 font-bold">
                    {q.estimatedPrice ? `${q.estimatedPrice.toLocaleString('vi-VN')} đ` : 'Chưa có'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Ghi chú khách hàng:</span>
                  <span className="text-slate-300 truncate block">{q.notes || 'Không có'}</span>
                </div>
              </div>

              {/* Status Update & Note */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                <div className="flex-1 flex items-center space-x-2">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <input
                    type="text"
                    placeholder="Ghi chú nội bộ cho yêu cầu này..."
                    defaultValue={q.adminNote || ''}
                    onChange={(e) =>
                      setAdminNoteInput({ ...adminNoteInput, [q.id]: e.target.value })
                    }
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500 placeholder-slate-600"
                  />
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <span className="text-[11px] text-slate-400">Chuyển:</span>
                  <button
                    onClick={() => updateStatus(q.id, 'CONTACTED')}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-blue-300 rounded-lg text-xs transition font-medium"
                  >
                    Đã liên hệ
                  </button>
                  <button
                    onClick={() => updateStatus(q.id, 'COMPLETED')}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-lg text-xs transition font-medium"
                  >
                    Hoàn thành
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
