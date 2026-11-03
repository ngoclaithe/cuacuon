'use client';

import React, { useEffect, useState } from 'react';
import { Settings, Save, CheckCircle2, AlertCircle, Sparkles, Globe, Phone, Image as ImageIcon } from 'lucide-react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'banners'>('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form states
  const [generalConfig, setGeneralConfig] = useState({
    siteName: '',
    shortName: '',
    slogan: '',
    hotline: '',
    hotline2: '',
    zalo: '',
    email: '',
    address: '',
    workingHours: '',
    announcement: '',
  });

  const [seoConfig, setSeoConfig] = useState({
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    canonicalUrl: '',
    ogImage: '',
  });

  const [heroBanners, setHeroBanners] = useState<any[]>([]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/settings/public');
        if (res.ok) {
          const data = await res.json();
          if (data.general_config) setGeneralConfig(data.general_config);
          if (data.seo_config) setSeoConfig(data.seo_config);
          if (data.hero_banners) setHeroBanners(data.hero_banners);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    setErrorMessage('');

    const token = localStorage.getItem('cuacuon_token');

    try {
      const res = await fetch('http://localhost:4000/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          general_config: generalConfig,
          seo_config: seoConfig,
          hero_banners: heroBanners,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Cập nhật thất bại');
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi kết nối máy chủ');
    } finally {
      setSaving(false);
    }
  };

  const updateBanner = (index: number, field: string, val: string) => {
    const updated = [...heroBanners];
    updated[index] = { ...updated[index], [field]: val };
    setHeroBanners(updated);
  };

  if (loading) {
    return <div className="text-white py-12 text-center text-sm">Đang tải cấu hình CMS...</div>;
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center space-x-2">
            <Settings className="w-7 h-7 text-brand-500" />
            <span>Quản Lý Cài Đặt Website (CMS Linh Động)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Mọi thay đổi tại đây được cập nhật trực tiếp lên website Next.js không cần sửa mã nguồn
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-extrabold text-sm shadow-xl flex items-center space-x-2 transition self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Đang lưu cấu hình...' : 'Lưu Tất Cả Cài Đặt'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-green-500/20 border border-green-500/40 text-green-300 text-sm flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
          <span>Đã lưu thành công cài đặt! Website Next.js đã được cập nhật dữ liệu mới.</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-300 text-sm flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 ${
            activeTab === 'general'
              ? 'bg-brand-600 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>Thông Tin Chung & Hotline</span>
        </button>

        <button
          onClick={() => setActiveTab('seo')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 ${
            activeTab === 'seo'
              ? 'bg-brand-600 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Cấu Hình SEO 100%</span>
        </button>

        <button
          onClick={() => setActiveTab('banners')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 ${
            activeTab === 'banners'
              ? 'bg-brand-600 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Banner Slider Trang Chủ</span>
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSave} className="bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-10 space-y-6">
        {/* Tab 1: General Info */}
        {activeTab === 'general' && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Thông Tin Thương Hiệu & Hotline Trực Tuyến
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Tên Website:</label>
                <input
                  type="text"
                  value={generalConfig.siteName}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, siteName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Tên Viết Tắt:</label>
                <input
                  type="text"
                  value={generalConfig.shortName}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, shortName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Hotline Cứu Hộ Chính (Nổi bật):</label>
                <input
                  type="text"
                  value={generalConfig.hotline}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, hotline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm font-bold text-brand-400 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Hotline Phụ / Kỹ Thuật:</label>
                <input
                  type="text"
                  value={generalConfig.hotline2}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, hotline2: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Số Zalo Tư Vấn:</label>
                <input
                  type="text"
                  value={generalConfig.zalo}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, zalo: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Email Tiếp Nhận:</label>
                <input
                  type="email"
                  value={generalConfig.email}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Địa Chỉ Trụ Sở Chính:</label>
              <input
                type="text"
                value={generalConfig.address}
                onChange={(e) => setGeneralConfig({ ...generalConfig, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Khẩu Hiệu / Slogan:</label>
              <input
                type="text"
                value={generalConfig.slogan}
                onChange={(e) => setGeneralConfig({ ...generalConfig, slogan: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Dòng Chữ Khuyến Mãi / Thông Báo Đầu Trang:
              </label>
              <textarea
                rows={2}
                value={generalConfig.announcement}
                onChange={(e) => setGeneralConfig({ ...generalConfig, announcement: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>
        )}

        {/* Tab 2: SEO Config */}
        {activeTab === 'seo' && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Cấu Hình Thẻ Meta & SEO Google (Chuẩn 100%)
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Thẻ Tiêu Đề (Meta Title):</label>
              <input
                type="text"
                value={seoConfig.metaTitle}
                onChange={(e) => setSeoConfig({ ...seoConfig, metaTitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-brand-500"
              />
              <span className="text-[11px] text-slate-500">Khuyên dùng: 50 - 65 ký tự</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Thẻ Mô Tả (Meta Description):</label>
              <textarea
                rows={3}
                value={seoConfig.metaDescription}
                onChange={(e) => setSeoConfig({ ...seoConfig, metaDescription: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-brand-500"
              />
              <span className="text-[11px] text-slate-500">Khuyên dùng: 140 - 160 ký tự</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Từ Khóa SEO (Meta Keywords):</label>
              <input
                type="text"
                value={seoConfig.metaKeywords}
                onChange={(e) => setSeoConfig({ ...seoConfig, metaKeywords: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Canonical URL:</label>
                <input
                  type="text"
                  value={seoConfig.canonicalUrl}
                  onChange={(e) => setSeoConfig({ ...seoConfig, canonicalUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Ảnh Chia Sẻ Mạng Xã Hội (OG Image):</label>
                <input
                  type="text"
                  value={seoConfig.ogImage}
                  onChange={(e) => setSeoConfig({ ...seoConfig, ogImage: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Hero Banners */}
        {activeTab === 'banners' && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Danh Sách Slide Banners Trang Chủ
            </h3>

            {heroBanners.map((banner, index) => (
              <div
                key={banner.id || index}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
              >
                <div className="font-bold text-brand-400 text-xs uppercase">
                  Slide {index + 1}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Thẻ Tag:</label>
                    <input
                      type="text"
                      value={banner.tag || ''}
                      onChange={(e) => updateBanner(index, 'tag', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Đường Dẫn Ảnh (Image URL):</label>
                    <input
                      type="text"
                      value={banner.image || ''}
                      onChange={(e) => updateBanner(index, 'image', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Tiêu Đề Lớn (Title):</label>
                  <input
                    type="text"
                    value={banner.title || ''}
                    onChange={(e) => updateBanner(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Mô Tả Phụ (Subtitle):</label>
                  <textarea
                    rows={2}
                    value={banner.subtitle || ''}
                    onChange={(e) => updateBanner(index, 'subtitle', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-extrabold text-sm shadow-xl flex items-center space-x-2 transition"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

