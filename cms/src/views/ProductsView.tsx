import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Search, Upload, Image as ImageIcon } from 'lucide-react';
import { API_BASE, resolveImageUrl } from '../config';
import type { Product, Category } from '../types';

interface ProductsViewProps {
  token: string;
}

export default function ProductsView({ token }: ProductsViewProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('1750000');
  const [thickness, setThickness] = useState('1.3mm');
  const [origin, setOrigin] = useState('Chính hãng Austdoor');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const fetchProducts = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch(`${API_BASE}/products?limit=50`),
        fetch(`${API_BASE}/categories`),
      ]);

      if (prodRes.ok) {
        const data = await prodRes.json();
        setProducts(data.items || []);
      }
      if (catRes.ok) {
        const cats = await catRes.json();
        setCategories(cats || []);
        if (cats.length > 0) setCategoryId(cats[0].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          categoryId,
          price: Number(price),
          salePrice: Number(price),
          thickness,
          origin,
          description,
          images: [image || 'https://api-cuacuon.dosutech.site/api/upload/file/assets/sp5.jpg'],
          inStock: true,
          isFeatured: true,
        }),
      });

      if (res.ok) {
        setShowAddModal(false);
        setName('');
        setImage('');
        setDescription('');
        fetchProducts();
      }
    } catch (err) {
      alert('Lỗi tạo sản phẩm');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      }
    } catch (err) {
      alert('Lỗi xóa sản phẩm');
    }
  };

  const handleUploadImage = async (file: File) => {
    setUploading(true);
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
        setImage(data.url);
      } else {
        alert(data.message || 'Tải ảnh thất bại');
      }
    } catch (e) {
      alert('Tải ảnh thất bại');
    } finally {
      setUploading(false);
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="text-slate-500 text-sm py-12 flex items-center justify-center font-medium">
        Đang tải danh sách sản phẩm...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Sản phẩm cửa cuốn</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Quản lý danh mục và thông số các mẫu cửa cuốn
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs shadow-sm flex items-center space-x-1.5 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm sản phẩm</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm theo tên..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
            />
          </div>
          <span className="text-xs font-semibold text-slate-500">{filtered.length} sản phẩm</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase tracking-wider font-bold text-[11px]">
              <tr>
                <th className="py-3 px-4">Sản phẩm</th>
                <th className="py-3 px-4">Danh mục</th>
                <th className="py-3 px-4">Độ dày</th>
                <th className="py-3 px-4">Giá niêm yết</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((p) => {
                const imgUrl = resolveImageUrl(p.images?.[0]);
                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={imgUrl}
                          alt={p.name}
                          onError={(e) => {
                            e.currentTarget.src =
                              'https://api-cuacuon.dosutech.site/api/upload/file/assets/sp5.jpg';
                          }}
                          className="w-11 h-11 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0 shadow-sm"
                        />
                        <div>
                          <div className="font-bold text-slate-900 text-xs sm:text-sm">{p.name}</div>
                          <div className="text-[11px] text-slate-500 font-mono mt-0.5">{p.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {p.category?.name || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{p.thickness || '—'}</td>
                    <td className="py-3.5 px-4 font-black text-orange-600">
                      {(p.salePrice || p.price || 0).toLocaleString('vi-VN')} đ/m²
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Thêm sản phẩm mới</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên sản phẩm *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Cửa Cuốn Austdoor Khe Thoáng A50"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Danh mục</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Giá niêm yết (đ/m²)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Độ dày nan</label>
                  <input
                    type="text"
                    value={thickness}
                    onChange={(e) => setThickness(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Xuất xứ</label>
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hình ảnh sản phẩm (Cloudflare R2)
                </label>
                <div className="flex items-center space-x-3">
                  {image ? (
                    <img
                      src={resolveImageUrl(image)}
                      alt="Preview"
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-100"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                  )}

                  <div className="flex-1 flex space-x-2">
                    <input
                      type="text"
                      placeholder="https://... hoặc tải lên R2"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                    />
                    <label className="px-3.5 py-2 bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 rounded-xl text-xs font-semibold cursor-pointer flex items-center space-x-1 transition shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploading ? 'Đang tải...' : 'Tải lên R2'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploading}
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleUploadImage(e.target.files[0]);
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-600 text-xs font-bold text-white hover:bg-orange-500 transition shadow-sm"
                >
                  Tạo sản phẩm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
