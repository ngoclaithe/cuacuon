import React, { useEffect, useState } from 'react';
import { Phone, AlertTriangle, MessageSquare, Check, ArrowRight } from 'lucide-react';
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
    return (
      <div className="text-slate-500 text-sm py-12 flex items-center justify-center font-medium">
        Đang tải danh sách yêu cầu...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Yêu cầu báo giá & cứu hộ
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Tiếp nhận thông tin khách hàng và điều phối thợ xử lý
          </p>
        </div>

        {/* Filter buttons */}
        <div className="inline-flex flex-wrap gap-1 bg-slate-200/80 p-1 rounded-xl">
          {[
            { id: '', label: 'Tất cả' },
            { id: 'PENDING', label: 'Chờ liên hệ' },
            { id: 'CONTACTED', label: 'Đang xử lý' },
            { id: 'COMPLETED', label: 'Hoàn thành' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                filterStatus === tab.id
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3.5">
        {quotes.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 text-xs shadow-sm font-medium">
            Không tìm thấy yêu cầu nào phù hợp
          </div>
        ) : (
          quotes.map((q) => (
            <div
              key={q.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
                <div className="flex items-center space-x-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                      q.serviceType === 'CUU_HO_KHAN_CAP'
                        ? 'bg-red-50 text-red-600 border-red-200'
                        : 'bg-orange-50 text-orange-600 border-orange-200'
                    }`}
                  >
                    {q.serviceType === 'CUU_HO_KHAN_CAP' ? (
                      <AlertTriangle className="w-5 h-5" />
                    ) : (
                      <Phone className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-extrabold text-slate-900">
                      {q.customerName}
                    </div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">
                      {q.address || 'Chưa cung cấp địa chỉ'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <a
                    href={`tel:${q.phone}`}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-orange-600 text-white font-bold text-xs hover:bg-orange-500 transition shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{q.phone}</span>
                  </a>
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold border ${
                      q.status === 'PENDING'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : q.status === 'COMPLETED'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-500 block text-[11px] font-semibold">
                    Loại cửa quan tâm:
                  </span>
                  <span className="text-slate-800 font-bold mt-0.5 block">
                    {q.doorType || 'Tư vấn chung'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px] font-semibold">
                    Dự toán ước tính:
                  </span>
                  <span className="text-orange-600 font-black mt-0.5 block">
                    {q.estimatedPrice ? `${q.estimatedPrice.toLocaleString('vi-VN')} đ` : 'Chưa có'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px] font-semibold">
                    Ghi chú khách hàng:
                  </span>
                  <span className="text-slate-700 font-medium truncate block mt-0.5">
                    {q.notes || 'Không có'}
                  </span>
                </div>
              </div>

              {/* Status Update & Note */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                <div className="flex-1 flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Ghi chú nội bộ cho yêu cầu này..."
                    defaultValue={q.adminNote || ''}
                    onChange={(e) =>
                      setAdminNoteInput({ ...adminNoteInput, [q.id]: e.target.value })
                    }
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-orange-500 placeholder-slate-400"
                  />
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <span className="text-xs font-semibold text-slate-500">Chuyển:</span>
                  <button
                    onClick={() => updateStatus(q.id, 'CONTACTED')}
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs transition font-bold"
                  >
                    Đã liên hệ
                  </button>
                  <button
                    onClick={() => updateStatus(q.id, 'COMPLETED')}
                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs transition font-bold"
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
