'use client';

import React, { useEffect, useState } from 'react';
import { Package, Plus, Trash2, Edit, CheckCircle, Search, AlertCircle } from 'lucide-react';
import { Product, Category } from '@/types';
import { API_BASE } from '@/lib/api';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New product form
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState<number>(1800000);
  const [thickness, setThickness] = useState('1.2mm - 1.4mm');
  const [origin, setOrigin] = useState('Chính Hãng Austdoor');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('/assets/sp5.jpg');

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
    const token = localStorage.getItem('cuacuon_token');

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
          images: [image],
          inStock: true,
          isFeatured: true,
        }),
      });

      if (res.ok) {
        setShowAddModal(false);
        fetchProducts();
      }
    } catch (err) {
      alert('Lỗi tạo sản phẩm');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    const token = localStorage.getItem('cuacuon_token');

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

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center space-x-2">
            <Package className="w-7 h-7 text-brand-500" />
            <span>Quản Lý Sản Phẩm Cửa Cuốn</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Tổng cộng: {products.length} sản phẩm trong kho dữ liệu
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center space-x-2 transition shadow-lg shadow-brand-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Sản Phẩm Mới</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center space-x-3">
        <Search className="w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Tìm theo tên sản phẩm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-white text-xs sm:text-sm focus:outline-none w-full placeholder-slate-500"
        />
      </div>

      {/* Products Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-slate-400 text-sm">Đang tải danh sách sản phẩm...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-slate-400 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Hình Ảnh</th>
                  <th className="py-3 px-4">Tên Sản Phẩm</th>
                  <th className="py-3 px-4">Danh Mục</th>
                  <th className="py-3 px-4">Độ Dày / Quy Cách</th>
                  <th className="py-3 px-4">Giá Niêm Yết</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {filtered.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-900/50">
                    <td className="py-3 px-4">
                      <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
                        <img
                          src={prod.images?.[0] || '/assets/sp5.jpg'}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-white text-sm">{prod.name}</div>
                      <span className="text-[10px] text-slate-500 font-mono">{prod.slug}</span>
                    </td>
                    <td className="py-3 px-4 text-brand-400 font-semibold">
                      {prod.category?.name || '---'}
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {prod.thickness || '---'}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-white">
                      {(prod.salePrice || prod.price || 0).toLocaleString('vi-VN')} đ/{prod.unit}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        title="Xóa sản phẩm"
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

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white">Thêm Mẫu Cửa Cuốn Mới</h2>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Tên Sản Phẩm *:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                  placeholder="Cửa cuốn khe thoáng Austdoor A52i"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Danh Mục:</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Giá Bán (VNĐ/m²):</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Độ Dày Nan:</label>
                  <input
                    type="text"
                    value={thickness}
                    onChange={(e) => setThickness(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                    placeholder="1.2mm - 1.4mm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Ảnh Đại Diện (URL):</label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Mô Tả Ngắn:</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                  placeholder="Nan nhôm kép siêu êm, giảm chấn 2 chiều..."
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
                  Tạo Sản Phẩm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

