export interface QuoteRequest {
  id: string;
  customerName: string;
  phone: string;
  address?: string;
  serviceType: string;
  doorType?: string;
  width?: number;
  height?: number;
  estimatedPrice?: number;
  notes?: string;
  status: 'PENDING' | 'CONTACTED' | 'SURVEYED' | 'COMPLETED' | 'CANCELLED';
  adminNote?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  price?: number;
  salePrice?: number;
  thickness?: string;
  origin?: string;
  description?: string;
  images: string[];
  inStock: boolean;
  isFeatured: boolean;
  isHot: boolean;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  isPublished: boolean;
  viewCount: number;
  createdAt: string;
}

