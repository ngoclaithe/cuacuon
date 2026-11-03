export const API_BASE = import.meta.env.VITE_API_URL || 'https://api-cuacuon.dosutech.site/api';
export const SITE_URL = 'https://cuacuon.dosutech.site';

export function resolveImageUrl(url?: string): string {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return 'https://api-cuacuon.dosutech.site/api/upload/file/assets/sp5.jpg';
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (url.startsWith('/api/')) {
    return `https://api-cuacuon.dosutech.site${url}`;
  }
  if (url.startsWith('/assets/')) {
    return `https://api-cuacuon.dosutech.site/api/upload/file${url}`;
  }
  return url;
}
