export interface SiteSettings {
  general_config: {
    siteName: string;
    shortName: string;
    slogan: string;
    hotline: string;
    hotline2: string;
    zalo: string;
    email: string;
    address: string;
    workingHours: string;
    emergencyBadge: string;
    announcement: string;
    logo: string;
    stats: Array<{ label: string; value: string }>;
  };
  seo_config: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    canonicalUrl: string;
    ogImage: string;
    siteSchemaType: string;
    geo: {
      latitude: string;
      longitude: string;
      region: string;
      placename: string;
    };
  };
  hero_banners: Array<{
    id: number;
    tag: string;
    title: string;
    subtitle: string;
    image: string;
    ctaText: string;
    ctaLink: string;
    secondaryText: string;
    secondaryLink: string;
  }>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sortOrder: number;
  isActive: boolean;
  _count?: {
    products: number;
  };
  products?: Product[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  code?: string | null;
  categoryId: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  price?: number | null;
  salePrice?: number | null;
  unit: string;
  thickness?: string | null;
  material?: string | null;
  origin?: string | null;
  warrantyMonths: number;
  description?: string | null;
  content?: string | null;
  specs?: Record<string, string> | null;
  features?: string[] | null;
  images: string[];
  isFeatured: boolean;
  isHot: boolean;
  inStock: boolean;
  seoTitle?: string | null;
  seoDescription?: string | null;
  sortOrder: number;
  related?: Product[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  coverImage?: string | null;
  category: string;
  author: string;
  tags?: string[] | null;
  isPublished: boolean;
  viewCount: number;
  seoTitle?: string | null;
  seoDescription?: string | null;
  createdAt: string;
  related?: Article[];
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  district: string;
  phone: string;
  hotline: string;
  isMain: boolean;
  mapUrl?: string | null;
  sortOrder: number;
}

export interface QuoteRequest {
  id: string;
  customerName: string;
  phone: string;
  address?: string | null;
  serviceType: string;
  doorType?: string | null;
  width?: number | null;
  height?: number | null;
  estimatedPrice?: number | null;
  notes?: string | null;
  status: 'PENDING' | 'CONTACTED' | 'COMPLETED' | 'CANCELLED';
  adminNote?: string | null;
  createdAt: string;
}

