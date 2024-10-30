'use server';

import React from 'react';
import { LayoutProps } from '@/types/router';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/sections/Footer';

export default function RootLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <div className="pt-16 min-h-screen">
        {children}
      </div>
      <Footer />
    </div>
  );
}
