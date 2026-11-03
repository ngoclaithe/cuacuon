'use client';

import React, { useState } from 'react';
import { Calculator, CheckCircle2, PhoneCall, Sparkles, AlertCircle } from 'lucide-react';
import { submitQuote } from '@/lib/api';

const DOOR_OPTIONS = [
  {
    id: 'khe-thoang-a50',
    name: 'Cửa Cuốn Khe Thoáng Austdoor A50 (Dày 1.3mm, siêu êm)',
    pricePerM2: 1750000,
    tag: 'Bán Chạy Nhất',
  },
  {
    id: 'sieu-thoang-c70',
    name: 'Cửa Cuốn Siêu Thoáng Austdoor C70 (Dày 2.3mm, lỗ lớn x4)',
    pricePerM2: 2450000,
    tag: 'Cao Cấp Biệt Thự',
  },
  {
    id: 'sieu-em-s52i',
    name: 'Cửa Cuốn Siêu Êm S52i (Dày 1.2mm, kẹp giảm chấn PA)',
    pricePerM2: 1680000,
    tag: 'Kinh Tế',
  },
  {
    id: 'tam-lien-austroll',
    name: 'Cửa Cuốn Tấm Liền Thép Úc Series 1 (Đóng mở siêu nhanh)',
    pricePerM2: 920000,
    tag: 'Gara & Kiot',
  },
  {
    id: 'khop-inox-vuong',
    name: 'Cửa Cuốn Khớp Inox Vuông 304 (Showroom, TTTM)',
    pricePerM2: 2950000,
    tag: 'Showroom',
  },
];

const MOTOR_OPTIONS = [
  { id: 'motor_ak500', name: 'Đồng bộ Motor Austdoor AK500 + 2 Remote mã nhảy ARC', price: 5200000 },
  { id: 'motor_none', name: 'Không kèm Motor (Dùng cót kéo tay / Đã có motor)', price: 0 },
];

export default function PriceCalculator() {
  const [doorType, setDoorType] = useState(DOOR_OPTIONS[0].id);
  const [width, setWidth] = useState<number>(3.5);
  const [height, setHeight] = useState<number>(3.2);
  const [motorType, setMotorType] = useState(MOTOR_OPTIONS[0].id);
  const [includeUps, setIncludeUps] = useState(true);

  // Form submission
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const selectedDoor = DOOR_OPTIONS.find((d) => d.id === doorType) || DOOR_OPTIONS[0];
  const selectedMotor = MOTOR_OPTIONS.find((m) => m.id === motorType) || MOTOR_OPTIONS[0];

  const area = Math.max(0, width * height);
  const doorCost = area * selectedDoor.pricePerM2;
  const motorCost = selectedMotor.price;
  const upsCost = includeUps ? 3100000 : 0;
  const totalCost = Math.round(doorCost + motorCost + upsCost);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) {
      setErrorMessage('Vui lòng nhập họ tên và số điện thoại');
      return;
    }
    setLoading(true);
    setErrorMessage('');

    try {
      await submitQuote({
        customerName,
        phone,
        address,
        serviceType: 'BAO_GIA_LAP_MOI',
        doorType: selectedDoor.name,
        width,
        height,
        estimatedPrice: totalCost,
        notes: `Kèm: ${selectedMotor.name} ${includeUps ? '+ Bình tích điện UPS E2000' : ''}`,
      });
      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Không thể gửi yêu cầu, vui lòng thử lại hoặc gọi Hotline!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="calculator" className="py-12 sm:py-16 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 bg-orange-100 text-orange-800 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Công Cụ Dự Toán Trực Tuyến</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Tính Giá Cửa Cuốn Trong 30 Giây
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm">
            Nhập kích thước cửa của gia đình bạn để nhận ngay dự toán chi phí minh bạch, chuẩn niêm yết
            kèm quà tặng bộ tự dừng chống xô nan trị giá 850.000đ.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Input Selection Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-5">
                1. Chọn loại cửa & kích thước phủ bì
              </h3>

              <div className="space-y-5">
                {/* Door Type Select */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                    Loại nan cửa cuốn:
                  </label>
                  <div className="space-y-2">
                    {DOOR_OPTIONS.map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                          doorType === opt.id
                            ? 'border-orange-500 bg-orange-50/40 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="doorType"
                            checked={doorType === opt.id}
                            onChange={() => setDoorType(opt.id)}
                            className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                          />
                          <div>
                            <div className="text-xs sm:text-sm font-semibold text-slate-800">{opt.name}</div>
                            <span className="inline-block text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded mt-0.5">
                              {opt.tag}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs sm:text-sm font-bold text-orange-600">
                            {opt.pricePerM2.toLocaleString('vi-VN')} đ
                          </span>
                          <span className="text-[10px] text-slate-400">/m²</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Dimensions (Width x Height) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      Chiều rộng lọt lòng (m):
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        max="12"
                        step="0.1"
                        value={width}
                        onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:outline-none font-bold text-slate-800 text-sm"
                      />
                      <span className="absolute right-3.5 top-2.5 text-slate-400 font-bold text-xs">m</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      Chiều cao lọt lòng (m):
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        max="10"
                        step="0.1"
                        value={height}
                        onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:outline-none font-bold text-slate-800 text-sm"
                      />
                      <span className="absolute right-3.5 top-2.5 text-slate-400 font-bold text-xs">m</span>
                    </div>
                  </div>
                </div>

                {/* Motor Options */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                    Lựa chọn Motor kéo tự động:
                  </label>
                  <div className="space-y-2">
                    {MOTOR_OPTIONS.map((m) => (
                      <label
                        key={m.id}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                          motorType === m.id
                            ? 'border-orange-500 bg-orange-50/40'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="motorType"
                            checked={motorType === m.id}
                            onChange={() => setMotorType(m.id)}
                            className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                          />
                          <span className="text-xs sm:text-sm font-semibold text-slate-800">{m.name}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-700">
                          {m.price > 0 ? `+${m.price.toLocaleString('vi-VN')} đ` : '0 đ'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* UPS Backup Battery */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeUps}
                      onChange={(e) => setIncludeUps(e.target.checked)}
                      className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500"
                    />
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-slate-800">
                        Bình lưu điện thông minh UPS E2000 (Lưu 72h khi mất điện)
                      </span>
                      <p className="text-[11px] text-slate-500">Đóng mở an toàn 25 lần khi cúp điện</p>
                    </div>
                  </label>
                  <span className="text-xs font-bold text-orange-600">+3.100.000 đ</span>
                </div>
              </div>
            </div>

            {/* Right: Price Breakdown & Submission Form */}
            <div className="lg:col-span-5 bg-slate-900 p-6 sm:p-8 text-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
                  <h4 className="text-sm font-bold text-slate-200">Dự Toán Chi Phí Chi Tiết</h4>
                  <span className="text-xs text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded font-bold">
                    Diện tích: {area.toFixed(2)} m²
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Thân cửa ({area.toFixed(1)}m² x {selectedDoor.pricePerM2.toLocaleString('vi-VN')}đ):</span>
                    <strong className="text-white">{Math.round(doorCost).toLocaleString('vi-VN')} đ</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Động cơ mô tơ:</span>
                    <strong className="text-white">{motorCost.toLocaleString('vi-VN')} đ</strong>
                  </div>
                  {includeUps && (
                    <div className="flex justify-between">
                      <span>Bình tích điện UPS 72h:</span>
                      <strong className="text-white">{upsCost.toLocaleString('vi-VN')} đ</strong>
                    </div>
                  )}

                  {/* Special promo */}
                  <div className="p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-start space-x-2 text-[11px] text-orange-300">
                    <Sparkles className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>Quà tặng tháng này:</strong> Tặng bộ rơ le tự dừng chống xô nan trị giá 850.000đ + Miễn phí đo đạc tại nhà!
                    </div>
                  </div>
                </div>

                {/* Total Cost Display */}
                <div className="mt-5 pt-5 border-t border-slate-800">
                  <span className="text-[10px] uppercase text-slate-400 tracking-wider font-semibold">
                    Tổng chi phí ước tính:
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-orange-400 tracking-tight mt-0.5">
                    {totalCost.toLocaleString('vi-VN')} <span className="text-sm font-bold text-white">VNĐ</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    * Giá trọn gói đã bao gồm ray nhôm, trục cuốn và công lắp đặt hoàn thiện.
                  </p>
                </div>
              </div>

              {/* Lead Submission Form */}
              <div className="mt-6 pt-5 border-t border-slate-800">
                {submitted ? (
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-center space-y-1.5">
                    <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto" />
                    <h5 className="font-bold text-white text-sm">Gửi Yêu Cầu Thành Công</h5>
                    <p className="text-xs text-green-200">
                      Kỹ thuật viên sẽ liên hệ lại với bạn trong 15 phút để xác nhận và mang mẫu nan tận nhà khảo sát miễn phí.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-2.5">
                    <h5 className="text-xs font-semibold text-slate-300">
                      Nhận Khảo Sát & Báo Giá Ưu Đãi Tận Nơi:
                    </h5>

                    {errorMessage && (
                      <div className="p-2 rounded bg-red-500/20 text-red-300 text-xs flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Họ và tên *"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-orange-500"
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Số điện thoại *"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-orange-500"
                        required
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Địa chỉ công trình (Quận, Phường tại Hà Nội)"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-orange-500"
                    />

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2 shadow-md"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{loading ? 'Đang gửi thông tin...' : 'Gửi Yêu Cầu Tư Vấn & Đo Đạc'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
