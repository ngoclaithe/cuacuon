import { SiteSettings, Category, Product, Article, Branch, QuoteRequest } from '@/types';

const API_BASE = (typeof window === 'undefined' && process.env.INTERNAL_API_URL)
  ? process.env.INTERNAL_API_URL
  : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api');

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch(`${API_BASE}/settings/public`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch settings');
    return await res.json();
  } catch (err) {
    console.error('Error fetching site settings:', err);
    // Safe fallback defaults
    return {
      general_config: {
        siteName: 'Cửa Cuốn Thủ Đô - Cứu Hộ & Lắp Đặt 24/7',
        shortName: 'Cửa Cuốn Thủ Đô',
        slogan: 'Cứu Hộ Khẩn Cấp 24/24 - Có Mặt Sau 15 Phút - Cam Kết Giá Chuẩn Niêm Yết',
        hotline: '0986 888 121',
        hotline2: '0968 928 563',
        zalo: '0986888121',
        email: 'cuacuonthudo.official@gmail.com',
        address: 'Số 36 Ngõ 6 Mạc Thái Tổ, Yên Hòa, Cầu Giấy, Hà Nội',
        workingHours: 'Phục vụ 24/7 (kể cả ban đêm, thứ 7, Chủ Nhật và ngày Lễ Tết)',
        emergencyBadge: 'Cứu Hộ Nhanh 15 Phút Có Mặt',
        announcement: 'KHUYẾN MÃI THÁNG NÀY: Tặng bộ tự dừng chống xô nan + Giảm 10% khi lắp đặt trọn bộ cửa cuốn Austdoor!',
        logo: '/assets/Slide2-1894x708-1.jpg',
        stats: [
          { label: 'Năm kinh nghiệm', value: '12+' },
          { label: 'Khách hàng tin chọn', value: '25,000+' },
          { label: 'Chi nhánh Hà Nội', value: '12 Cơ sở' },
          { label: 'Thời gian có mặt', value: '15 Phút' },
        ]
      },
      seo_config: {
        metaTitle: 'Cửa Cuốn Thủ Đô | Cứu Hộ Cửa Cuốn Hà Nội 24/7 - Có Mặt Sau 15 Phút',
        metaDescription: 'Cửa cuốn Thủ Đô chuyên cứu hộ sửa chữa cửa cuốn khẩn cấp 24/24 tại Hà Nội. Đội thợ có mặt sau 15 phút.',
        metaKeywords: 'cứu hộ cửa cuốn, sửa cửa cuốn hà nội, cửa cuốn thủ đô',
        canonicalUrl: 'https://cuacuonthudo.com',
        ogImage: '/assets/Slide2-1894x708-1.jpg',
        siteSchemaType: 'HomeAndConstructionBusiness',
        geo: {
          latitude: '21.0185',
          longitude: '105.7912',
          region: 'VN-HN',
          placename: 'Cầu Giấy, Hà Nội',
        }
      },
      hero_banners: [
        {
          id: 1,
          tag: 'CỨU HỘ KHẨN CẤP 24/24',
          title: 'Cứu Hộ Cửa Cuốn Hà Nội Có Mặt Sau 15 Phút',
          subtitle: 'Kẹt nan, đứt cót, chập hộp tín hiệu, hỏng mô tơ, mất chìa khóa... Đội ngũ kỹ thuật túc trực tại 12 quận nội thành giải quyết triệt để sự cố.',
          image: '/assets/Slide2-1894x708-1.jpg',
          ctaText: 'Gọi Cứu Hộ: 0986 888 121',
          ctaLink: 'tel:0986888121',
          secondaryText: 'Xem Báo Giá Nhanh',
          secondaryLink: '/bang-gia',
        }
      ]
    };
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE}/categories`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return await res.json();
  } catch (err) {
    console.error('Error fetching categories:', err);
    return [];
  }
}

export async function getProducts(params?: {
  categorySlug?: string;
  isFeatured?: boolean;
  isHot?: boolean;
  search?: string;
  limit?: number;
  page?: number;
}): Promise<{ items: Product[]; total: number; totalPages: number }> {
  try {
    const query = new URLSearchParams();
    if (params?.categorySlug) query.append('categorySlug', params.categorySlug);
    if (params?.isFeatured !== undefined) query.append('isFeatured', String(params.isFeatured));
    if (params?.isHot !== undefined) query.append('isHot', String(params.isHot));
    if (params?.search) query.append('search', params.search);
    if (params?.limit) query.append('limit', String(params.limit));
    if (params?.page) query.append('page', String(params.page));

    const res = await fetch(`${API_BASE}/products?${query.toString()}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch (err) {
    console.error('Error fetching products:', err);
    return { items: [], total: 0, totalPages: 0 };
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE}/products/slug/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error(`Error fetching product ${slug}:`, err);
    return null;
  }
}

export async function getArticles(params?: {
  category?: string;
  search?: string;
  limit?: number;
  page?: number;
}): Promise<{ items: Article[]; total: number; totalPages: number }> {
  try {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.limit) query.append('limit', String(params.limit));
    if (params?.page) query.append('page', String(params.page));

    const res = await fetch(`${API_BASE}/articles?${query.toString()}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch articles');
    return await res.json();
  } catch (err) {
    console.error('Error fetching articles:', err);
    return { items: [], total: 0, totalPages: 0 };
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(`${API_BASE}/articles/slug/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error(`Error fetching article ${slug}:`, err);
    return null;
  }
}

export async function getBranches(): Promise<Branch[]> {
  try {
    const res = await fetch(`${API_BASE}/branches`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch branches');
    return await res.json();
  } catch (err) {
    console.error('Error fetching branches:', err);
    return [];
  }
}

export async function submitQuote(data: {
  customerName: string;
  phone: string;
  address?: string;
  serviceType: string;
  doorType?: string;
  width?: number;
  height?: number;
  estimatedPrice?: number;
  notes?: string;
}) {
  const res = await fetch(`${API_BASE}/quotes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Không thể gửi yêu cầu');
  }
  return await res.json();
}

