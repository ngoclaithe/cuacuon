import { getSiteSettings, getCategories, getBranches } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import SchemaJsonLd from '@/components/SchemaJsonLd';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, categories, branches] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getBranches(),
  ]);

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-slate-800 bg-slate-50 selection:bg-brand-500 selection:text-white">
      <SchemaJsonLd settings={settings} />
      <Header settings={settings} categories={categories} />
      <main className="flex-1">{children}</main>
      <FloatingContact settings={settings} />
      <Footer settings={settings} branches={branches} />
    </div>
  );
}
