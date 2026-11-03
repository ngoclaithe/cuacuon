import React from 'react';
import { SiteSettings } from '@/types';

interface SchemaJsonLdProps {
  settings: SiteSettings;
  product?: any;
  article?: any;
  breadcrumb?: Array<{ name: string; url: string }>;
}

export default function SchemaJsonLd({ settings, product, article, breadcrumb }: SchemaJsonLdProps) {
  const { general_config, seo_config } = settings;

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': 'https://cuacuonthudo.com/#organization',
    name: general_config?.siteName || 'Cửa Cuốn Thủ Đô',
    alternateName: 'Cửa Cuốn Thủ Đô Hà Nội',
    url: 'https://cuacuonthudo.com',
    logo: 'https://cuacuonthudo.com' + (general_config?.logo || '/assets/Slide2-1894x708-1.jpg'),
    image: 'https://cuacuonthudo.com' + (general_config?.logo || '/assets/Slide2-1894x708-1.jpg'),
    telephone: general_config?.hotline || '0986888121',
    priceRange: '₫₫',
    address: {
      '@type': 'PostalAddress',
      streetAddress: general_config?.address || 'Số 36 Ngõ 6 Mạc Thái Tổ',
      addressLocality: 'Cầu Giấy',
      addressRegion: 'Hà Nội',
      addressCountry: 'VN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: seo_config?.geo?.latitude || '21.0185',
      longitude: seo_config?.geo?.longitude || '105.7912',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '128',
      bestRating: '5',
      worstRating: '1',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Hà Nội',
    },
  };

  const productSchema = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.images?.[0] ? `https://cuacuonthudo.com${product.images[0]}` : undefined,
        description: product.description || product.name,
        sku: product.code || product.slug,
        brand: {
          '@type': 'Brand',
          name: product.origin || 'Austdoor',
        },
        offers: {
          '@type': 'Offer',
          url: `https://cuacuonthudo.com/san-pham/${product.slug}`,
          priceCurrency: 'VND',
          price: product.salePrice || product.price || 1500000,
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
        },
      }
    : null;

  const articleSchema = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        image: article.coverImage ? `https://cuacuonthudo.com${article.coverImage}` : undefined,
        datePublished: article.createdAt,
        dateModified: article.createdAt,
        author: {
          '@type': 'Organization',
          name: article.author || 'Cửa Cuốn Thủ Đô',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Cửa Cuốn Thủ Đô',
          logo: {
            '@type': 'ImageObject',
            url: 'https://cuacuonthudo.com/assets/Slide2-1894x708-1.jpg',
          },
        },
        description: article.excerpt || article.title,
      }
    : null;

  const breadcrumbSchema = breadcrumb
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumb.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
    </>
  );
}

