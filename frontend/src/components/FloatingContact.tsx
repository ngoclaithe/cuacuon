'use client';

import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, ArrowUp, Calculator } from 'lucide-react';
import { SiteSettings } from '@/types';

interface FloatingContactProps {
  settings: SiteSettings;
}

export default function FloatingContact({ settings }: FloatingContactProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const hotline = settings.general_config?.hotline || '0986 888 121';
  const hotlineClean = hotline.replace(/\s+/g, '');
  const zaloNumber = settings.general_config?.zalo || '0986888121';

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside aria-label="Liên hệ nhanh" className="fixed bottom-6 right-5 z-40 flex flex-col items-end space-y-2.5">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Lên đầu trang"
          className="w-10 h-10 bg-slate-900/90 hover:bg-slate-950 text-white rounded-full flex items-center justify-center shadow-md backdrop-blur transition hover:scale-110"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Quick Calculator Shortcut */}
      <a
        href="/#calculator"
        aria-label="Dự toán giá cửa cuốn"
        title="Dự toán giá cửa cuốn"
        className="group relative flex items-center bg-slate-900/90 hover:bg-slate-900 text-white p-2.5 rounded-full shadow-lg border border-slate-700/80 backdrop-blur transition hover:scale-105"
      >
        <Calculator className="w-5 h-5 text-orange-400" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out px-0 group-hover:px-2 text-xs font-semibold text-slate-200">
          Dự Toán Giá
        </span>
      </a>

      {/* Zalo Button */}
      <a
        href={`https://zalo.me/${zaloNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo hỗ trợ"
        title="Chat Zalo"
        className="group relative flex items-center bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-full shadow-lg transition hover:scale-105"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out px-0 group-hover:px-2 text-xs font-semibold text-white">
          Chat Zalo
        </span>
      </a>

      {/* Emergency Call Button */}
      <div className="relative">
        <span className="animate-ping absolute inset-0 rounded-full bg-orange-500 opacity-30 pointer-events-none"></span>
        <a
          href={`tel:${hotlineClean}`}
          className="relative flex items-center space-x-2 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2.5 rounded-full shadow-xl font-bold text-xs tracking-wide transition hover:scale-105"
        >
          <Phone className="w-4 h-4" />
          <span>{hotline}</span>
        </a>
      </div>
    </aside>
  );
}
