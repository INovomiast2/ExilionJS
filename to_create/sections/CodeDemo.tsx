import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useI18n } from '@/hooks/useI18n';
import { FiCopy, FiCheck, FiCode } from 'react-icons/fi';

const codeExamples = {
  page: `
// app/blog/[slug]/page.tsx
import { db } from '@/lib/db';

// 🎯 Type-safe params with Zod
export const params = z.object({
  slug: z.string(),
});

// ⚡️ Server-side data loading
export async function load({ params }) {
  const post = await db.post.findUnique({
    where: { slug: params.slug }
  });
  
  return { post };
}

// 🎨 Page Component
export default function BlogPost({ data: { post } }) {
  return (
    <article className="prose dark:prose-invert">
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}`,

  layout: `
// app/blog/layout.tsx
import { Sidebar } from '@/components/Sidebar';

// 🌳 Shared data loading
export async function load() {
  const categories = await db.category.findMany();
  return { categories };
}

// 📱 Layout Component
export default function BlogLayout({ children, data }) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <aside className="col-span-3">
        <Sidebar categories={data.categories} />
      </aside>
      <main className="col-span-9">
        {children}
      </main>
    </div>
  );
}`,

  api: `
// app/api/posts/route.ts

// 🔍 GET handler
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') ?? '1');
  const limit = parseInt(searchParams.get('limit') ?? '10');

  const posts = await db.post.findMany({
    take: limit,
    skip: (page - 1) * limit,
    orderBy: { createdAt: 'desc' },
  });

  return Response.json({
    items: posts,
    metadata: {
      page,
      limit,
      total: await db.post.count(),
    }
  });
}

// 📝 POST handler
export async function POST(req) {
  const body = await req.json();
  
  // 🛡️ Validate input
  const data = postSchema.parse(body);
  
  const post = await db.post.create({
    data: {
      ...data,
      authorId: req.auth.userId,
    }
  });

  return Response.json(post, { status: 201 });
}`
};

type CodeTab = 'page' | 'layout' | 'api';

export default function CodeDemo() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<CodeTab>('page');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeExamples[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative max-w-4xl mx-auto"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl" />
      
      <div className="relative bg-black/40 backdrop-blur-xl rounded-lg overflow-hidden border border-white/10">
        {/* Code Editor Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/20">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex gap-2">
              {(['page', 'layout', 'api'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    activeTab === tab
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            {copied ? (
              <>
                <FiCheck className="w-4 h-4 text-green-500" />
                <span className="text-sm">Copied!</span>
              </>
            ) : (
              <>
                <FiCopy className="w-4 h-4" />
                <span className="text-sm">Copy</span>
              </>
            )}
          </motion.button>
        </div>

        <div className="p-4 overflow-x-auto">
          <SyntaxHighlighter
            language="typescript"
            style={{
              ...vscDarkPlus,
              'pre[class*="language-"]': {
                ...vscDarkPlus['pre[class*="language-"]'],
                background: 'transparent',
                margin: 0,
              },
            }}
            className="!bg-transparent !m-0"
            showLineNumbers
            wrapLines
          >
            {codeExamples[activeTab]}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
          >
            <div className="text-2xl mb-2">{feature.icon}</div>
            <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
            <p className="text-sm text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

const features = [
  {
    icon: "✨",
    title: "Type Safety",
    description: "Full TypeScript support with automatic type inference"
  },
  {
    icon: "🛡️",
    title: "Validation",
    description: "Built-in data validation using Zod"
  },
  {
    icon: "🚀",
    title: "Performance",
    description: "Optimized for speed and efficiency"
  },
  {
    icon: "🔒",
    title: "Security",
    description: "Built-in security features and middleware"
  }
]; 