'use client';

import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { CodePreview } from '@/components/sections/CodePreview';
import { Testimonials } from '@/components/sections/Testimonials';

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <section className="min-h-screen">
        <Hero />
      </section>
      <section className="py-32 bg-slate-800/50">
        <Features />
      </section>
      <section className="py-32 bg-slate-900">
        <div className="container mx-auto px-4">
          <CodePreview />
        </div>
      </section>
      <section className="py-32 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <Testimonials />
        </div>
      </section>
    </main>
  );
}
