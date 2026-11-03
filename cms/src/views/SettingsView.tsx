import React, { useEffect, useState } from 'react';
import { Save, CheckCircle2, AlertCircle, Upload, Image as ImageIcon } from 'lucide-react';
import { API_BASE, resolveImageUrl } from '../config';

interface SettingsViewProps {
  token: string;
}

export default function SettingsView({ token }: SettingsViewProps) {
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'banners'>('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);

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
    setUploadingIdx(idx);
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
      } else {
        alert(data.message || 'Tải ảnh lên thất bại');
      }
    } catch (e) {
      alert('Tải ảnh lên thất bại');
    } finally {
      setUploadingIdx(null);
    }
  };

  if (loading) {
    return (
      <div className="text-slate-500 text-sm py-12 flex items-center justify-center font-medium">
        Đang tải cấu hình...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Cài đặt website</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Tùy chỉnh thông tin liên hệ, SEO và banner trang chủ
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-sm flex items-center space-x-2 transition self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Đã lưu cài đặt website thành công.</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center space-x-2 shadow-sm">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="inline-flex bg-slate-200/80 p-1 rounded-xl space-x-1">
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`py-2 px-4 text-xs font-bold rounded-lg transition ${
            activeTab === 'general'
              ? 'bg-white text-orange-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Thông tin chung
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          className={`py-2 px-4 text-xs font-bold rounded-lg transition ${
            activeTab === 'seo'
              ? 'bg-white text-orange-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Cấu hình SEO
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('banners')}
          className={`py-2 px-4 text-xs font-bold rounded-lg transition ${
            activeTab === 'banners'
              ? 'bg-white text-orange-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Banner trang chủ
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Tab 1: General */}
        {activeTab === 'general' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Tên website</label>
                <input
                  type="text"
                  value={generalConfig.siteName}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, siteName: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Tên viết tắt</label>
                <input
                  type="text"
                  value={generalConfig.shortName}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, shortName: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Hotline cứu hộ chính</label>
                <input
                  type="text"
                  value={generalConfig.hotline}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, hotline: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-mono font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Hotline phụ</label>
                <input
                  type="text"
                  value={generalConfig.hotline2}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, hotline2: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-mono font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Số Zalo tư vấn</label>
                <input
                  type="text"
                  value={generalConfig.zalo}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, zalo: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-mono font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Email tiếp nhận</label>
                <input
                  type="email"
                  value={generalConfig.email}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, email: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Địa chỉ trụ sở</label>
                <input
                  type="text"
                  value={generalConfig.address}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, address: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Khẩu hiệu / Slogan</label>
                <input
                  type="text"
                  value={generalConfig.slogan}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, slogan: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Thông báo thanh đầu trang</label>
                <input
                  type="text"
                  value={generalConfig.announcement}
                  onChange={(e) => setGeneralConfig({ ...generalConfig, announcement: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: SEO */}
        {activeTab === 'seo' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Tiêu đề trang (Meta Title)</label>
              <input
                type="text"
                value={seoConfig.metaTitle}
                onChange={(e) => setSeoConfig({ ...seoConfig, metaTitle: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Mô tả tóm tắt (Meta Description)</label>
              <textarea
                rows={3}
                value={seoConfig.metaDescription}
                onChange={(e) => setSeoConfig({ ...seoConfig, metaDescription: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Từ khóa chính (cách nhau bằng dấu phẩy)</label>
              <input
                type="text"
                value={seoConfig.metaKeywords}
                onChange={(e) => setSeoConfig({ ...seoConfig, metaKeywords: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Banners */}
        {activeTab === 'banners' && (
          <div className="space-y-4">
            {heroBanners.map((banner, idx) => {
              const bannerImg = resolveImageUrl(banner.image);
              return (
                <div key={banner.id || idx} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-extrabold text-orange-600 uppercase tracking-wider">
                      Banner #{idx + 1}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Nhãn nổi bật</label>
                      <input
                        type="text"
                        value={banner.tag || ''}
                        onChange={(e) => {
                          const updated = [...heroBanners];
                          updated[idx] = { ...updated[idx], tag: e.target.value };
                          setHeroBanners(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Tiêu đề lớn</label>
                      <input
                        type="text"
                        value={banner.title || ''}
                        onChange={(e) => {
                          const updated = [...heroBanners];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setHeroBanners(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Mô tả phụ</label>
                      <input
                        type="text"
                        value={banner.subtitle || ''}
                        onChange={(e) => {
                          const updated = [...heroBanners];
                          updated[idx] = { ...updated[idx], subtitle: e.target.value };
                          setHeroBanners(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Hình ảnh banner (Cloudflare R2)</label>
                      <div className="flex items-center space-x-3">
                        {banner.image ? (
                          <img
                            src={bannerImg}
                            alt="Banner Preview"
                            onError={(e) => {
                              e.currentTarget.src =
                                'https://api-cuacuon.dosutech.site/api/upload/file/assets/Slide2-1894x708-1.jpg';
                            }}
                            className="w-20 h-12 rounded-xl object-cover border border-slate-200 bg-slate-100 shrink-0 shadow-sm"
                          />
                        ) : (
                          <div className="w-20 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                        )}

                        <div className="flex-1 flex space-x-2">
                          <input
                            type="text"
                            value={banner.image || ''}
                            onChange={(e) => {
                              const updated = [...heroBanners];
                              updated[idx] = { ...updated[idx], image: e.target.value };
                              setHeroBanners(updated);
                            }}
                            className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                          />
                          <label className="px-3.5 py-2 bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 rounded-xl text-xs font-bold cursor-pointer flex items-center space-x-1.5 transition shrink-0">
                            <Upload className="w-3.5 h-3.5" />
                            <span>{uploadingIdx === idx ? 'Đang tải...' : 'Tải ảnh (R2)'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              disabled={uploadingIdx === idx}
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
                </div>
              );
            })}
          </div>
        )}
      </form>
    </div>
  );
}
