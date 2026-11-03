'use client';

import React, { useEffect, useState } from 'react';
import { FileText, Plus, Trash2, Eye, Search } from 'lucide-react';
import { Article } from '@/types';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // New article form
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('KIENTHUC');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('/assets/dv2.jpg');

  const fetchArticles = async () => {
    const token = localStorage.getItem('cuacuon_token');
    try {
      const res = await fetch('http://localhost:4000/api/articles/admin', {
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
    const token = localStorage.getItem('cuacuon_token');

    try {
      const res = await fetch('http://localhost:4000/api/articles', {
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
    const token = localStorage.getItem('cuacuon_token');

    try {
      const res = await fetch(`http://localhost:4000/api/articles/${id}`, {
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

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center space-x-2">
            <FileText className="w-7 h-7 text-brand-500" />
            <span>Quản Lý Bài Viết & Cẩm Nang Kỹ Thuật</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Tổng cộng: {articles.length} bài viết hỗ trợ SEO trên website
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center space-x-2 transition shadow-lg shadow-brand-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Viết Bài Mới</span>
        </button>
      </div>

      {/* Articles Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-slate-400 text-sm">Đang tải...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-slate-400 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Tiêu Đề Bài Viết</th>
                  <th className="py-3 px-4">Chuyên Mục</th>
                  <th className="py-3 px-4">Lượt Xem</th>
                  <th className="py-3 px-4">Trạng Thái</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {articles.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm line-clamp-1">{art.title}</div>
                      <span className="text-[10px] text-slate-500 font-mono">{art.slug}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-brand-400 font-bold uppercase text-[10px] bg-brand-500/10 px-2 py-0.5 rounded">
                        {art.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>{art.viewCount}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded">
                        ĐÃ XUẤT BẢN
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDelete(art.id)}
                        className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20"
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
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white">Thêm Bài Viết / Cẩm Nang Cửa Cuốn</h2>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Tiêu Đề Bài Viết *:</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                  placeholder="Cách bảo dưỡng motor cửa cuốn không bị kẹt..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Chuyên Mục:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                  >
                    <option value="KIENTHUC">Kiến Thức & Kỹ Thuật</option>
                    <option value="CUUHO">Cứu Hộ & Sửa Chữa</option>
                    <option value="BAOGIA">Báo Giá & Khuyến Mãi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Ảnh Đại Diện (URL):</label>
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Đoạn Trích Tóm Tắt (Excerpt):</label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Nội Dung Bài Viết (HTML / Văn bản):</label>
                <textarea
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono"
                  placeholder="<p>Nội dung bài viết chi tiết...</p>"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold"
                >
                  Đăng Bài Viết
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

