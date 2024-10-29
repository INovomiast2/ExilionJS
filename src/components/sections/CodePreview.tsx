'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCopy, FiCheck, FiCode, FiTerminal, FiLayout } from 'react-icons/fi';
import { useI18n } from '@/hooks/useI18n';
import { Tilt } from 'react-tilt';

const codeExamples = {
  routing: `
// Crea una nueva página en segundos
export default function BlogPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">
        Mi Blog
      </h1>
      <div className="mt-4">
        {posts.map(post => (
          <article key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}`,
  state: `
// Gestión de estado simple y potente
const { state, setState } = useExilonState({
  theme: 'dark',
  language: 'es',
  user: null
});

// Actualizaciones atómicas
setState(prev => ({
  ...prev,
  theme: prev.theme === 'dark' ? 'light' : 'dark'
}));`,
  api: `
// APIs tipo REST con validación de tipos
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const post = await db.post.findUnique({
    where: { id: params.id }
  });

  return Response.json({ post });
}`
};

interface TabProps {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab = ({ icon: Icon, label, isActive, onClick }: TabProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
      isActive 
        ? 'bg-blue-500 text-white' 
        : 'bg-white/5 text-gray-400 hover:bg-white/10'
    }`}
  >
    <Icon className="w-4 h-4" />
    {label}
  </motion.button>
);

export function CodePreview() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<keyof typeof codeExamples>('routing');
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeExamples[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-32 bg-slate-900/50 overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />

      <motion.div
        className="container mx-auto px-4"
        style={{ y }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-6">
            {t('code.title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('code.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Tilt
            className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10"
            options={{
              max: 5,
              scale: 1,
              speed: 1000,
              glare: true,
              "max-glare": 0.5,
            }}
          >
            {/* Barra de herramientas */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex gap-2">
                <Tab
                  icon={FiCode}
                  label="Routing"
                  isActive={activeTab === 'routing'}
                  onClick={() => setActiveTab('routing')}
                />
                <Tab
                  icon={FiTerminal}
                  label="State"
                  isActive={activeTab === 'state'}
                  onClick={() => setActiveTab('state')}
                />
                <Tab
                  icon={FiLayout}
                  label="API"
                  isActive={activeTab === 'api'}
                  onClick={() => setActiveTab('api')}
                />
              </div>
              <button
                onClick={copyToClipboard}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {copied ? <FiCheck className="w-5 h-5" /> : <FiCopy className="w-5 h-5" />}
              </button>
            </div>

            {/* Editor de código */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <SyntaxHighlighter
                language="typescript"
                style={atomDark}
                customStyle={{
                  margin: 0,
                  padding: '2rem',
                  background: 'transparent',
                  fontSize: '14px',
                }}
                showLineNumbers
              >
                {codeExamples[activeTab]}
              </SyntaxHighlighter>
            </motion.div>
          </Tilt>
        </div>
      </motion.div>
    </section>
  );
} 