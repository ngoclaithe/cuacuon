import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Search, Upload } from 'lucide-react';
import { API_BASE } from '../config';
import type { Article } from '../types';

interface ArticlesViewProps {
  token: string;
}

export default function ArticlesView({ token }: ArticlesViewProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState('');

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('KIENTHUC');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('/assets/dv2.jpg');

  const fetchArticles = async () => {
    try {
      const res = await fetch(`${API_BASE}/articles/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setArticles(data.items || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          category,
          excerpt,
          content,
          coverImage,
          isPublished: true,
        }),
      });

      if (res.ok) {
        setShowAddModal(false);
        fetchArticles();
      }
    } catch (err) {
      alert('Lỗi tạo bài viết');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return;
    try {
      const res = await fetch(`${API_BASE}/articles/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setArticles(articles.filter((a) => a.id !== id));
      }
    } catch (err) {
      alert('Lỗi xóa bài viết');
    }
  };

  const handleUploadImage = async (file: File) => {
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
        setCoverImage(data.url);
      }
    } catch (e) {
      alert('Tải ảnh thất bại');
    }
  };

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return <div className="text-slate-400 text-sm py-10">Đang tải bài viết...</div>;
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Bài viết & tin tức</h1>
          <p className="text-xs text-slate-400 mt-0.5">Quản lý cẩm nang kỹ thuật và hướng dẫn sử dụng cửa cuốn</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs shadow flex items-center space-x-1.5 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm bài viết</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>
          <span className="text-xs text-slate-400">{filtered.length} bài viết</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="py-3 px-4">Bài viết</th>
                <th className="py-3 px-4">Chuyên mục</th>
                <th className="py-3 px-4">Lượt xem</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={a.coverImage || '/assets/dv2.jpg'}
                        alt={a.title}
                        className="w-12 h-8 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0"
                      />
                      <div className="max-w-md truncate">
                        <div className="font-semibold text-white truncate">{a.title}</div>
                        <div className="text-[11px] text-slate-500 font-mono truncate">{a.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    {a.category === 'KIENTHUC'
                      ? 'Kiến thức'
                      : a.category === 'TINTUC'
                      ? 'Tin tức'
                      : 'Hướng dẫn'}
                  </td>
                  <td className="py-3 px-4 text-slate-400">{a.viewCount}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition"
                      title="Xóa bài viết"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <h2 className="text-base font-bold text-white">Thêm bài viết mới</h2>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Tiêu đề bài viết *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Chuyên mục</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="KIENTHUC">Kiến thức cửa cuốn</option>
                    <option value="HUONGDAN">Hướng dẫn kỹ thuật</option>
                    <option value="TINTUC">Tin tức & khuyến mãi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Ảnh đại diện</label>
                  <label className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs text-slate-200 cursor-pointer flex items-center justify-center space-x-1.5 transition">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Tải ảnh (R2)</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) handleUploadImage(e.target.files[0]);
                      }}
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Tóm tắt ngắn</label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nội dung chi tiết *</label>
                <textarea
                  rows={6}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Nhập nội dung bài viết..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 hover:bg-slate-700 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-orange-600 text-xs font-semibold text-white hover:bg-orange-500 transition"
                >
                  Đăng bài
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
