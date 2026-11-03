import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageSrc = product.images?.[0] || '/assets/cua-cuon-khe-thoang-AD-E51i.webp';
  const hasSale = product.salePrice && product.salePrice < (product.price || 0);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={imageSrc}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {product.isHot && (
            <span className="bg-slate-900 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow-sm">
              Nổi Bật
            </span>
          )}
          {hasSale && (
            <span className="bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
              Ưu Đãi
            </span>
          )}
        </div>

        <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur text-slate-800 text-[10px] font-semibold px-2 py-0.5 rounded-md shadow-sm flex items-center space-x-1">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          <span>BH {product.warrantyMonths}T</span>
        </div>
      </div>

      {/* Body Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {product.category && (
            <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
              {product.category.name}
            </span>
          )}

          <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-orange-600 transition line-clamp-2 mt-1">
            <Link href={`/san-pham/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {product.thickness && (
            <p className="text-xs text-slate-500 mt-1 flex items-center space-x-1">
              <span className="font-medium text-slate-600">Độ dày:</span>
              <span>{product.thickness}</span>
            </p>
          )}

          {product.description && (
            <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 font-medium">Giá niêm yết:</div>
            <div className="flex items-baseline space-x-1">
              <span className="text-base sm:text-lg font-black text-slate-900">
                {(product.salePrice || product.price || 0).toLocaleString('vi-VN')} đ
              </span>
              <span className="text-xs text-slate-500 font-normal">/{product.unit}</span>
            </div>
          </div>

          <Link
            href={`/san-pham/${product.slug}`}
            className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white flex items-center justify-center transition shadow-sm"
            aria-label={`Xem chi tiết ${product.name}`}
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
