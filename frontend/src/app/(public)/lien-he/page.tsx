import React from 'react';
import { Metadata } from 'next';
import { getSiteSettings, getBranches } from '@/lib/api';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Liên Hệ & Hệ Thống 12 Chi Nhánh Sửa Cửa Cuốn Hà Nội',
  description: 'Liên hệ Cửa Cuốn Thủ Đô - Trụ sở 36 Ngõ 6 Mạc Thái Tổ, Cầu Giấy và mạng lưới 12 cơ sở cứu hộ túc trực 24/24 tại Hà Nội.',
};

export default async function ContactPage() {
  const [settings, branches] = await Promise.all([
    getSiteSettings(),
    getBranches(),
  ]);

  const { general_config } = settings;
  const hotline = general_config?.hotline || '0986 888 121';
  const hotlineClean = hotline.replace(/\s+/g, '');

  return (
    <div className="py-10 bg-slate-50 min-h-screen space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center space-x-1.5 bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Phục Vụ Toàn Hà Nội</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
            Liên Hệ Cửa Cuốn Thủ Đô
          </h1>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Tổng đài cứu hộ và tư vấn kỹ thuật trực 24/24. Kỹ thuật viên có mặt tại hiện trường sau 15 phút.
          </p>
        </div>

        {/* Contact Information & Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Info Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-navy-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
            <div>
              <span className="text-brand-400 font-extrabold text-xs uppercase tracking-wider">
                Trụ Sở Chính
              </span>
              <h2 className="text-2xl font-black text-white mt-1">Cửa Cuốn Thủ Đô</h2>
              <p className="text-xs text-slate-400 mt-1">Đại lý phân phối & Cứu hộ khẩn cấp 24/7</p>
            </div>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Địa chỉ trụ sở:</strong>
                  <span>{general_config?.address || 'Số 36 Ngõ 6 Mạc Thái Tổ, Yên Hòa, Cầu Giấy, Hà Nội'}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Hotline 24/7 (Có mặt sau 15p):</strong>
                  <a href={`tel:${hotlineClean}`} className="text-brand-400 font-black text-base hover:underline">
                    {hotline}
                  </a>
                  {general_config?.hotline2 && (
                    <span className="text-slate-300"> - {general_config.hotline2}</span>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Email tiếp nhận:</strong>
                  <span>{general_config?.email || 'cuacuonthudo.official@gmail.com'}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Thời gian làm việc:</strong>
                  <span>{general_config?.workingHours || '24/7 kể cả ngày lễ tết và ban đêm'}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800">
              <a
                href={`tel:${hotlineClean}`}
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl text-center text-sm shadow-lg flex items-center justify-center space-x-2 transition"
              >
                <Phone className="w-4 h-4 fill-current animate-bounce" />
                <span>GỌI CỨU HỘ NGAY ({hotline})</span>
              </a>
            </div>
          </div>

          {/* Right: Embedded Google Map */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-3 border border-slate-200/80 shadow-sm overflow-hidden">
            <iframe
              title="Bản đồ Cửa Cuốn Thủ Đô"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.453303108781!2d105.7911677761009!3d21.014539880630713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab59d7fa9a37%3A0xe54955745e69e469!2zMzYgTmfDtSA2IE3huqFjIFRow6FpIFThu5UsIFnDqm4gSMOyYSwgQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWksIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="380"
              style={{ border: 0, borderRadius: '1rem' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* 12 Branches System */}
        <div id="branches" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950">
              Hệ Thống 12 Điểm Chốt Cứu Hộ Tại Các Quận Hà Nội
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Kỹ thuật viên túc trực tại chỗ, mang đầy đủ phụ kiện máy móc để cứu hộ ngay:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {branches.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:border-brand-500 hover:bg-white transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 text-sm">{b.name}</h3>
                  {b.isMain && (
                    <span className="text-[10px] font-black uppercase bg-brand-600 text-white px-2 py-0.5 rounded">
                      Trụ sở
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 flex items-start space-x-1.5 mb-3">
                  <MapPin className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <span>{b.address}</span>
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <span className="text-xs text-slate-500">Quận: {b.district}</span>
                  <a
                    href={`tel:${b.phone.replace(/\s+/g, '')}`}
                    className="text-xs font-black text-red-600 hover:underline flex items-center space-x-1"
                  >
                    <Phone className="w-3.5 h-3.5 fill-current" />
                    <span>{b.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

