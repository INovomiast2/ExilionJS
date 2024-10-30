import React, { Suspense, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { HeroScene } from '@/components/3d/HeroScene';
import { CommandBar } from '@/components/ui/CommandBar';
import { FiTerminal, FiZap, FiCode, FiArrowRight } from 'react-icons/fi';

const FloatingFeatures = React.lazy(() => import('@/components/sections/FloatingFeatures'));
const CodeExperience = React.lazy(() => import('@/components/sections/CodeExperience'));
const InteractiveDemo = React.lazy(() => import('@/components/sections/InteractiveDemo'));

export default function HomePage() {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showCommandBar, setShowCommandBar] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
    layoutEffect: false
  });

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div ref={containerRef} className="relative bg-[#030014]">
        {/* Fondo animado */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#030014] to-[#030014]" />
        </div>

        {/* Command Bar */}
        <AnimatePresence>
          {showCommandBar && (
            <CommandBar onClose={() => setShowCommandBar(false)} />
          )}
        </AnimatePresence>

        {/* Botón flotante para Command Bar */}
        <motion.button
          onClick={() => setShowCommandBar(true)}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiTerminal className="w-6 h-6" />
        </motion.button>

        {/* Contenido principal */}
        <main className="relative z-10">
          {/* Hero Section con escena 3D */}
          <section className="h-screen relative overflow-hidden">
            <HeroScene />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 1, bounce: 0.5 }}
                  className="relative inline-block mb-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-xl opacity-50 animate-pulse" />
                  <span className="relative px-6 py-2 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 text-sm font-medium">
                    {t('hero.version')} ⚡️
                  </span>
                </motion.div>

                <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
                  Exilon<span className="text-blue-500">JS</span>
                </h1>

                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                  {t('hero.description')}
                </p>

                <div className="flex items-center justify-center gap-4">
                  <motion.button
                    className="group px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiZap className="w-5 h-5" />
                    <span>{t('hero.cta.primary')}</span>
                    <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>

                  <motion.button
                    className="px-8 py-4 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 text-white font-medium flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiCode className="w-5 h-5" />
                    <span>{t('hero.cta.docs')}</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Características Flotantes */}
          <section className="py-32 relative">
            <FloatingFeatures />
          </section>

          {/* Experiencia de Código */}
          <section className="py-32 relative">
            <CodeExperience />
          </section>

          {/* Demo Interactiva */}
          <section className="py-32 relative">
            <InteractiveDemo />
          </section>
        </main>
      </div>
    </Suspense>
  );
}
