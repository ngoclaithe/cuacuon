import React, { useEffect, useState } from 'react';
import { Save, CheckCircle2, AlertCircle, Upload } from 'lucide-react';
import { API_BASE } from '../config';

interface SettingsViewProps {
  token: string;
}

export default function SettingsView({ token }: SettingsViewProps) {
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'banners'>('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
        const res = await fetch(`${API_BASE}/settings/public`);
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

    try {
      const res = await fetch(`${API_BASE}/settings`, {
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
        throw new Error(err.message || 'Lưu cài đặt không thành công');
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi kết nối máy chủ');
    } finally {
      setSaving(false);
    }
  };

  const handleUploadBannerImage = async (idx: number, file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        const updated = [...heroBanners];
        updated[idx] = { ...updated[idx], image: data.url };
        setHeroBanners(updated);
      }
    } catch (e) {
      alert('Tải ảnh lên thất bại');
    }
  };

  if (loading) {
    return <div className="text-slate-400 text-sm py-10">Đang tải cấu hình...</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Cài đặt website</h1>
          <p className="text-xs text-slate-400 mt-0.5">Tùy chỉnh thông tin liên hệ, SEO và banner trang chủ</p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs shadow flex items-center space-x-2 transition self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Đã lưu cài đặt thành công.</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-800 space-x-2">
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`py-2 px-3 text-xs font-semibold rounded-t-lg transition border-b-2 ${
            activeTab === 'general'
              ? 'border-orange-500 text-orange-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Thông tin chung
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          className={`py-2 px-3 text-xs font-semibold rounded-t-lg transition border-b-2 ${
            activeTab === 'seo'
              ? 'border-orange-500 text-orange-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Cấu hình SEO
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('banners')}
          className={`py-2 px-3 text-xs font-semibold rounded-t-lg transition border-b-2 ${
            activeTab === 'banners'
              ? 'border-orange-500 text-orange-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Banner trang chủ
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Tab 1: General */}
        {activeTab === 'general' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Tên website</label>
                <input
                  type="text"
                  value={generalConfig.siteName}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, siteName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Tên viết tắt</label>
                <input
                  type="text"
                  value={generalConfig.shortName}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, shortName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Hotline cứu hộ chính</label>
                <input
                  type="text"
                  value={generalConfig.hotline}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, hotline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Hotline phụ</label>
                <input
                  type="text"
                  value={generalConfig.hotline2}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, hotline2: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Số Zalo tư vấn</label>
                <input
                  type="text"
                  value={generalConfig.zalo}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, zalo: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Email tiếp nhận</label>
                <input
                  type="email"
                  value={generalConfig.email}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Địa chỉ trụ sở</label>
                <input
                  type="text"
                  value={generalConfig.address}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, address: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Khẩu hiệu / Slogan</label>
                <input
                  type="text"
                  value={generalConfig.slogan}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, slogan: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Thông báo thanh đầu trang</label>
                <input
                  type="text"
                  value={generalConfig.announcement}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, announcement: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: SEO */}
        {activeTab === 'seo' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Tiêu đề trang (Meta Title)</label>
              <input
                type="text"
                value={seoConfig.metaTitle}
                onChange={(e) => setSeoConfig({ ...seoConfig, metaTitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Mô tả tóm tắt (Meta Description)</label>
              <textarea
                rows={3}
                value={seoConfig.metaDescription}
                onChange={(e) => setSeoConfig({ ...seoConfig, metaDescription: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Từ khóa chính (cách nhau bằng dấu phẩy)</label>
              <input
                type="text"
                value={seoConfig.metaKeywords}
                onChange={(e) => setSeoConfig({ ...seoConfig, metaKeywords: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Banners */}
        {activeTab === 'banners' && (
          <div className="space-y-4">
            {heroBanners.map((banner, idx) => (
              <div key={banner.id || idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="text-xs font-bold text-orange-400">Banner #{idx + 1}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Nhãn nổi bật</label>
                    <input
                      type="text"
                      value={banner.tag || ''}
                      onChange={(e) => {
                        const updated = [...heroBanners];
                        updated[idx] = { ...updated[idx], tag: e.target.value };
                        setHeroBanners(updated);
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Tiêu đề lớn</label>
                    <input
                      type="text"
                      value={banner.title || ''}
                      onChange={(e) => {
                        const updated = [...heroBanners];
                        updated[idx] = { ...updated[idx], title: e.target.value };
                        setHeroBanners(updated);
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Mô tả phụ</label>
                    <input
                      type="text"
                      value={banner.subtitle || ''}
                      onChange={(e) => {
                        const updated = [...heroBanners];
                        updated[idx] = { ...updated[idx], subtitle: e.target.value };
                        setHeroBanners(updated);
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Đường dẫn ảnh banner</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={banner.image || ''}
                        onChange={(e) => {
                          const updated = [...heroBanners];
                          updated[idx] = { ...updated[idx], image: e.target.value };
                          setHeroBanners(updated);
                        }}
                        className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                      <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs text-slate-200 cursor-pointer flex items-center space-x-1.5 transition">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Tải ảnh lên (R2)</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) handleUploadBannerImage(idx, e.target.files[0]);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

